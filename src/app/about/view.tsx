'use client';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageHeader from '@/app/components/page-header';
import AboutUsView from './us/view';
import FounderView from './founder/view';
import StaffsView from './staffs/view';

export default function AboutView() {
  return (
    <div>
      <PageHeader title="About" subtitle="Discover SARC Education Foundation" />
      
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <Tabs defaultValue="us" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto mb-12">
            <TabsTrigger value="us">About Us</TabsTrigger>
            <TabsTrigger value="founder">Our Founder</TabsTrigger>
            <TabsTrigger value="staffs">Team & Staff</TabsTrigger>
          </TabsList>
          
          <TabsContent value="us">
            <AboutUsView />
          </TabsContent>
          
          <TabsContent value="founder">
            <FounderView />
          </TabsContent>
          
          <TabsContent value="staffs">
            <StaffsView />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
