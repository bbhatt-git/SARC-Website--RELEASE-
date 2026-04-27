import * as XLSX from 'xlsx';

type ExcelFileType = 'notice' | 'results';

async function fetchExcelFromGithub(fileType: ExcelFileType): Promise<Buffer | null> {
  const owner = process.env.GITHUB_REPO_OWNER;
  const repo = process.env.GITHUB_REPO_NAME;
  const path = fileType === 'notice' 
    ? process.env.GITHUB_NOTICE_FILE_PATH 
    : process.env.GITHUB_RESULTS_FILE_PATH;
  const token = process.env.GITHUB_TOKEN;

  if (!owner || !repo || !path || !token) {
    console.error(`GitHub environment variables for ${fileType} data are not set.`);
    return null;
  }

  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
      cache: 'no-store' // Fetch fresh data on every request
    });

    if (!response.ok) {
      console.error(`Failed to fetch ${path} from GitHub API: ${response.statusText}`);
      return null;
    }

    const fileData = await response.json();
    if (fileData.content) {
        const content = Buffer.from(fileData.content, 'base64');
        return content;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching ${path} file from GitHub:`, error);
    return null;
  }
}

export async function getExcelData(sheetIdentifier: string, fileType: ExcelFileType): Promise<any[]> {
    const fileBuffer = await fetchExcelFromGithub(fileType);
    if (!fileBuffer) {
        return [];
    }

    try {
        const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
        const targetName = sheetIdentifier.toLowerCase();
        let sheetName = workbook.SheetNames.find(name => name.toLowerCase() === targetName);

        if (!sheetName) {
            sheetName = workbook.SheetNames.find(name => name.toLowerCase().includes(targetName));
        }
        
        const sheet = sheetName ? workbook.Sheets[sheetName] : undefined;
        
        if (!sheet) {
          console.warn(`Sheet matching "${sheetIdentifier}" not found in the ${fileType} file.`);
          return [];
        }
        
        // Use raw: true to get raw values and prevent auto-parsing of dates into JS Date objects.
        // This fixes the "Only plain objects can be passed to Client Components" error.
        const jsonData: any[] = XLSX.utils.sheet_to_json(sheet, { raw: true });
        
        return jsonData;
    } catch (error) {
        console.error(`An error occurred while parsing the ${fileType} Excel file:`, error);
        return [];
    }
}
