"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Upload, FileText, Users, Mail, Send, Calendar, Gauge, Eye, MousePointer, ShieldCheck, ChevronDown, Plus,
    Save, Clock, Bold, Italic, Underline, Link2, List, Tags, Info, MessageCircle, X, 
    ChevronRight, Sparkles, LayoutTemplate, ArrowUpRight, Clipboard, ClipboardCheck
} from "lucide-react";
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion";

export default function BulkSenderPage() {
  const [selectedTab, setSelectedTab] = useState('email');
  const [recipientsCount, setRecipientsCount] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [message, setMessage] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [copied, setCopied] = useState(false);
  const [tags] = useState([
    { id: 'first_name', label: 'First Name' },
    { id: 'last_name', label: 'Last Name' },
    { id: 'company', label: 'Company' },
    { id: 'position', label: 'Position' },
    { id: 'link', label: 'Dynamic Link' }
  ]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Simulate file upload
  const handleFileUpload = () => {
    setRecipientsCount(247);
  };

  // Template content
  const templates = {
    intro: {
      name: "Introduction Sequence",
      subject: "Exploring solutions for {company}",
      content: `Hi {first_name},\n\nI noticed your work at {company} and thought our enterprise solutions might help you achieve {goal}. Would you be open to a quick 15-minute demo next week?\n\nBest regards,\n{your_name}`
    },
    followUp: {
      name: "Follow-up Series",
      subject: "Following up on our previous conversation",
      content: `Hi {first_name},\n\nJust circling back on my previous email. I'd love to hear your thoughts on how we might help {company} with {solution}.\n\nWould next week work for a quick chat?\n\nBest,\n{your_name}`
    },
    newsletter: {
      name: "Monthly Newsletter",
      subject: "{company} Monthly Insights - {month}",
      content: `Hello {first_name},\n\nHere's your monthly roundup of industry insights:\n\n1. {insight_one}\n2. {insight_two}\n3. {insight_three}\n\nRead the full analysis here: {link}\n\nBest,\n{your_name}`
    }
  };

  // Insert tag into message
  const insertTag = (tag: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const before = text.substring(0, start);
    const after = text.substring(end, text.length);
    
    setMessage(before + `{${tag}}` + after);
    
    // Focus and position cursor after inserted tag
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = start + tag.length + 2;
    }, 0);
  };

  // Copy to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Character count
  const characterCount = message.length;
  const characterLimit = 5000;
  const characterPercentage = Math.min(100, (characterCount / characterLimit) * 100);

  // Auto-expand textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* ... existing header and stats ... */}
      
      {/* Main Content */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        {/* ... existing tabs list ... */}
        
        <TabsContent value="email" className="pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* UPGRADED Message Content Card */}
              <Card className="border border-[#2A3050]/10 shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl group">
                <CardHeader className="bg-gradient-to-r from-[#1B1F3B]/5 to-[#2D325E]/5 border-b border-[#2A3050]/10 pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl text-[#1B1F3B] flex items-center gap-2">
                        <LayoutTemplate className="h-5 w-5 text-indigo-600" />
                        Message Content
                      </CardTitle>
                      <CardDescription className="text-[#3C4568]">
                        Compose your message or select from templates
                      </CardDescription>
                    </div>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      className="text-indigo-600 hover:bg-indigo-500/10"
                      onClick={() => setShowPreview(!showPreview)}
                    >
                      {showPreview ? 'Edit Content' : 'Show Preview'} 
                      <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-0.5" />
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="p-0">
                  <AnimatePresence mode="wait">
                    {showPreview ? (
                      <motion.div
                        key="preview"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="p-6"
                      >
                        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                          <div className="bg-gray-50 px-4 py-2 border-b flex justify-between items-center">
                            <div className="text-xs font-medium text-gray-500">PREVIEW MODE</div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500">{recipientsCount} recipients</span>
                              <span className="h-1 w-1 bg-gray-400 rounded-full"></span>
                              <span className="text-xs text-gray-500">Email</span>
                            </div>
                          </div>
                          <div className="p-4 min-h-[300px]">
                            <div className="mb-4">
                              <div className="font-medium text-gray-900">Subject: {templates[selectedTemplate as keyof typeof templates]?.subject || "Your subject here"}</div>
                              <div className="text-xs text-gray-500">From: SIKRY Intelligence &lt;contact@sikry.com&gt;</div>
                            </div>
                            <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap">
                              {message || "Your message content will appear here..."}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="editor"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-6 p-6"
                      >
                        <div className="space-y-3">
                          <Label htmlFor="subject" className="text-[#1B1F3B] font-medium flex items-center gap-1">
                            Subject Line
                            <span className="text-xs text-rose-500 ml-1">*</span>
                          </Label>
                          <div className="relative">
                            <Input 
                              id="subject" 
                              placeholder="Enter your email subject" 
                              className="border-[#2A3050]/20 focus:border-indigo-500 focus:ring-indigo-500 pl-9"
                              value={templates[selectedTemplate as keyof typeof templates]?.subject || ""}
                            />
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <Label htmlFor="template" className="text-[#1B1F3B] font-medium flex items-center gap-2">
                              <LayoutTemplate className="h-4 w-4 text-indigo-500" />
                              Template
                            </Label>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-indigo-600 border-indigo-500/50 hover:bg-indigo-500/10 hover:border-indigo-600"
                            >
                              <Plus size={14} className="h-4 w-4 mr-1" /> 
                              New Template
                            </Button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {Object.entries(templates).map(([key, template]) => (
                              <div 
                                key={key}
                                className={`border rounded-lg p-3 cursor-pointer transition-all duration-200 ${
                                  selectedTemplate === key 
                                    ? 'border-indigo-500 bg-indigo-50/50 shadow-sm' 
                                    : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/30'
                                }`}
                                onClick={() => {
                                  setSelectedTemplate(key);
                                  setMessage(template.content);
                                }}
                              >
                                <div className="flex justify-between items-start">
                                  <h4 className="font-medium text-gray-900">{template.name}</h4>
                                  {selectedTemplate === key && (
                                    <div className="bg-indigo-500 w-5 h-5 rounded-full flex items-center justify-center">
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                      </svg>
                                    </div>
                                  )}
                                </div>
                                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{template.content.split('\n')[0]}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <Label htmlFor="message" className="text-[#1B1F3B] font-medium flex items-center gap-2">
                              <Sparkles className="h-4 w-4 text-indigo-500" />
                              Message Content
                            </Label>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-indigo-600 hover:bg-indigo-500/10"
                              onClick={copyToClipboard}
                            >
                              {copied ? (
                                <>
                                  <ClipboardCheck size={14} className="mr-1.5" /> Copied!
                                </>
                              ) : (
                                <>
                                  <Clipboard size={14} className="mr-1.5" /> Copy
                                </>
                              )}
                            </Button>
                          </div>
                          
                          <div className="rounded-lg border border-gray-200 overflow-hidden">
                            <div className="bg-gray-50 px-3 py-2 border-b flex flex-wrap items-center gap-1">
                              <div className="text-xs font-medium text-gray-700 mr-2">Insert:</div>
                              {tags.map(tag => (
                                <Button
                                  key={tag.id}
                                  variant="outline"
                                  size="sm"
                                  className="text-xs h-7 px-2 py-1 bg-white border-gray-300 hover:bg-indigo-50 hover:border-indigo-400 hover:text-indigo-700"
                                  onClick={() => insertTag(tag.id)}
                                >
                                  {tag.label}
                                </Button>
                              ))}
                            </div>
                            
                            <Textarea
                              ref={textareaRef}
                              id="message"
                              placeholder="Compose your message here..."
                              className="min-h-[250px] border-0 rounded-none focus:ring-0 p-4"
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                            />
                            
                            <div className="bg-gray-50 px-4 py-2 border-t flex justify-between items-center">
                              <div className="text-xs text-gray-600 flex items-center">
                                <Info size={14} className="mr-1.5 text-blue-500" />
                                Personalization tags detected:{" "}
                                {tags.filter(tag => message.includes(`{${tag.id}}`)).map(tag => (
                                  <code 
                                    key={tag.id} 
                                    className="bg-indigo-100 text-indigo-800 px-1.5 py-0.5 rounded text-xs ml-1.5"
                                  >
                                    {`{${tag.id}}`}
                                  </code>
                                ))}
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <div className="text-xs text-gray-500">
                                  {characterCount}/{characterLimit}
                                </div>
                                <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full ${
                                      characterPercentage > 90 ? 'bg-rose-500' : 
                                      characterPercentage > 75 ? 'bg-amber-500' : 'bg-indigo-500'
                                    }`}
                                    style={{ width: `${characterPercentage}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3 pt-2">
                          <Checkbox 
                            id="personalize" 
                            defaultChecked 
                            className="text-indigo-600 border-gray-300 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600" 
                          />
                          <Label htmlFor="personalize" className="text-[#3C4568]">
                            Enable recipient personalization
                          </Label>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
                
                <CardFooter className="bg-gray-50 border-t border-[#2A3050]/10 px-6 py-4">
                  <div className="flex justify-between w-full">
                    <Button 
                      variant="outline" 
                      className="border-gray-300 text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        setSelectedTemplate('');
                        setMessage('');
                      }}
                    >
                      <X className="h-4 w-4 mr-2" /> Reset
                    </Button>
                    <div className="flex gap-2">
                      <Button variant="outline" className="border-indigo-500/50 text-indigo-600 hover:bg-indigo-50">
                        <Save className="h-4 w-4 mr-2" /> Save Draft
                      </Button>
                      <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md shadow-indigo-500/20">
                        Next: Audience <ArrowUpRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </CardFooter>
              </Card>
              
              {/* ... Delivery Settings Card ... */}
               <Card className="border border-[#2A3050]/10 shadow-sm transition-all duration-300 hover:bg-[#2A3050]/5 hover:border-[#2A3050]/30">
                <CardHeader>
                  <CardTitle className="text-xl text-[#1B1F3B]">Delivery Strategy</CardTitle>
                  <CardDescription className="text-[#3C4568]">Optimize your sending strategy for maximum deliverability</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="send-time" className="text-[#1B1F3B] font-medium">Delivery Timing</Label>
                      <Select>
                        <SelectTrigger className="border-[#2A3050]/20 focus:border-[#1B1F3B] focus:ring-[#1B1F3B]">
                          <SelectValue placeholder="Select send strategy" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="now" className="flex items-center">
                            <Send className="h-4 w-4 mr-2" /> Send immediately
                          </SelectItem>
                          <SelectItem value="schedule">
                            <Calendar className="h-4 w-4 mr-2" /> Schedule for later
                          </SelectItem>
                          <SelectItem value="optimal">
                            <Clock className="h-4 w-4 mr-2" /> Optimal time per recipient
                          </SelectItem>
                          <SelectItem value="drip">
                            <ChevronDown className="h-4 w-4 mr-2" /> Drip campaign
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="throttle" className="text-[#1B1F3B] font-medium">Send Rate</Label>
                      <Select>
                        <SelectTrigger className="border-[#2A3050]/20 focus:border-[#1B1F3B] focus:ring-[#1B1F3B]">
                          <SelectValue placeholder="Messages per hour" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">10 messages/hour</SelectItem>
                          <SelectItem value="25">25 messages/hour</SelectItem>
                          <SelectItem value="50">50 messages/hour (recommended)</SelectItem>
                          <SelectItem value="100">100 messages/hour</SelectItem>
                          <SelectItem value="250">250 messages/hour</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center space-x-3">
                      <Checkbox id="track-opens" defaultChecked className="text-[#1B1F3B] border-[#2A3050]/30" />
                      <Label htmlFor="track-opens" className="text-[#3C4568]">Track message opens</Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Checkbox id="track-clicks" defaultChecked className="text-[#1B1F3B] border-[#2A3050]/30" />
                      <Label htmlFor="track-clicks" className="text-[#3C4568]">Track link clicks</Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Checkbox id="unsubscribe" defaultChecked className="text-[#1B1F3B] border-[#2A3050]/30" />
                      <Label htmlFor="unsubscribe" className="text-[#3C4568]">Include unsubscribe link</Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Checkbox id="retry" className="text-[#1B1F3B] border-[#2A3050]/30" />
                      <Label htmlFor="retry" className="text-[#3C4568]">Automatically retry failed sends</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* ... Right Column ... */}
             <div className="space-y-8">
              {/* Recipients Card */}
              <Card className="border border-[#2A3050]/10 shadow-sm transition-all duration-300 hover:bg-[#2A3050]/5 hover:border-[#2A3050]/30">
                <CardHeader>
                  <CardTitle className="text-xl text-[#1B1F3B]">Audience Selection</CardTitle>
                  <CardDescription className="text-[#3C4568]">Define who will receive this campaign</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-[#1B1F3B] font-medium">Import Recipients</Label>
                    <div className="grid grid-cols-1 gap-3">
                      <Button 
                        variant="outline" 
                        className="border-[#2A3050]/20 text-[#1B1F3B] hover:bg-[#2A3050]/5 justify-start"
                        onClick={handleFileUpload}
                      >
                        <Upload className="mr-3 h-4 w-4" />
                        Upload CSV/Excel
                      </Button>
                      <Button variant="outline" className="border-[#2A3050]/20 text-[#1B1F3B] hover:bg-[#2A3050]/5 justify-start">
                        <Users className="mr-3 h-4 w-4" />
                        Select from CRM
                      </Button>
                      <Button variant="outline" className="border-[#2A3050]/20 text-[#1B1F3B] hover:bg-[#2A3050]/5 justify-start">
                        <FileText className="mr-3 h-4 w-4" />
                        Paste Email List
                      </Button>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-[#2A3050]/10">
                    <div className="flex justify-between items-center">
                      <span className="text-[#1B1F3B] font-medium">Recipients Summary</span>
                      <span className="text-[#1B1F3B] font-bold">{recipientsCount}</span>
                    </div>
                    
                    {recipientsCount > 0 ? (
                      <div className="mt-4 space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-[#3C4568]">Valid emails</span>
                          <span className="text-[#1B1F3B]">238 (96.4%)</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-[#3C4568]">Invalid emails</span>
                          <span className="text-[#1B1F3B]">9 (3.6%)</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-[#3C4568]">Unsubscribed</span>
                          <span className="text-[#1B1F3B]">14 (5.7%)</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-[#3C4568]">Duplicate entries</span>
                          <span className="text-[#1B1F3B]">3 (1.2%)</span>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-4 p-6 bg-[#2A3050]/5 rounded-lg text-center">
                        <FileText className="h-8 w-8 mx-auto text-[#3C4568]" />
                        <p className="text-[#3C4568] mt-2">No recipients selected yet</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              {/* Compliance Card */}
              <Card className="border border-[#2A3050]/10 shadow-sm transition-all duration-300 hover:bg-[#2A3050]/5 hover:border-[#2A3050]/30">
                <CardHeader>
                  <CardTitle className="text-xl text-[#1B1F3B] flex items-center">
                    <ShieldCheck className="h-5 w-5 mr-2 text-[#1B1F3B]" />
                    Deliverability Assurance
                  </CardTitle>
                  <CardDescription className="text-[#3C4568]">Ensure compliance with regulations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-[#1B1F3B] font-medium">Spam Risk Score</span>
                        <span className="text-green-600 font-medium">Low (2.1/10)</span>
                      </div>
                      <div className="h-2 bg-[#2A3050]/10 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{width: '21%'}}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-[#1B1F3B] font-medium">Regulatory Compliance</span>
                        <span className="text-green-600 font-medium">Passed</span>
                      </div>
                      <ul className="text-sm text-[#3C4568] space-y-2">
                        <li className="flex items-center">
                          <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                          Unsubscribe mechanism detected
                        </li>
                        <li className="flex items-center">
                          <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                          Physical address included
                        </li>
                        <li className="flex items-center">
                          <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                          CAN-SPAM requirements satisfied
                        </li>
                        <li className="flex items-center">
                          <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                          GDPR compliant language detected
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="sender-address" className="text-[#1B1F3B] font-medium">Sender Information</Label>
                    <Input 
                      id="sender-address" 
                      defaultValue="SIKRY Intelligence • 123 Business Ave, Zurich, Switzerland" 
                      className="border-[#2A3050]/20 focus:border-[#1B1F3B] focus:ring-[#1B1F3B]"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        {/* ... LinkedIn and SMS tabs ... */}
        <TabsContent value="linkedin" className="pt-8">
  <Card className="border border-[#2A3050]/10 shadow-lg overflow-hidden">
    <CardHeader className="bg-gradient-to-r from-[#1B1F3B]/5 to-[#2D325E]/5 border-b border-[#2A3050]/10">
      <CardTitle className="text-xl text-[#1B1F3B] flex items-center gap-2">
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
        LinkedIn Outreach
      </CardTitle>
      <CardDescription className="text-[#3C4568]">
        Craft your connection request and follow-up message for LinkedIn
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-6 p-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="linkedin-connection-request" className="text-[#1B1F3B] font-medium flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-600" />
            Connection Request (Optional)
          </Label>
          <Textarea
            id="linkedin-connection-request"
            placeholder="e.g., Hi {firstName}, I came across your profile and was impressed by your work at {companyName}..."
            className="min-h-[120px] border-[#2A3050]/20 focus:border-blue-500 focus:ring-blue-500"
          />
          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-500">
              Keep it short and personalized. Max 300 characters for connection requests.
            </p>
            <span className="text-xs text-gray-500">0/300</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="linkedin-main-message" className="text-[#1B1F3B] font-medium flex items-center gap-2">
            <MessageCircle className="h-4 w-4 text-blue-600" />
            Main Message
          </Label>
          <div className="bg-gray-50 px-3 py-2 border border-gray-300 border-b-0 rounded-t-md flex items-center gap-2">
            <button className="p-1 hover:bg-gray-200 rounded" title="Bold">
              <Bold size={16} className="text-gray-600" />
            </button>
            <button className="p-1 hover:bg-gray-200 rounded" title="Italic">
              <Italic size={16} className="text-gray-600" />
            </button>
            <div className="h-4 border-l border-gray-300"></div>
            <button className="p-1 hover:bg-gray-200 rounded" title="Insert Tag">
              <Tags size={16} className="text-gray-600" />
            </button>
          </div>
          <Textarea
            id="linkedin-main-message"
            placeholder="e.g., Thanks for connecting, {firstName}! I'd love to discuss how our solutions could help {companyName} with..."
            className="min-h-[200px] border-[#2A3050]/20 focus:border-blue-500 focus:ring-blue-500 rounded-t-none border-t-0"
          />
          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-500">
              Available tags:{" "}
              <span className="inline-flex gap-1">
                <code className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-700">{`{firstName}`}</code>
                <code className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-700">{`{lastName}`}</code>
                <code className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-700">{`{companyName}`}</code>
                <code className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-700">{`{jobTitle}`}</code>
              </span>
            </div>
            <span className="text-xs text-gray-500">0/2000</span>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-800 mb-3 flex items-center gap-2">
          <Info className="h-4 w-4" />
          LinkedIn Message Preview
        </h4>
        <div className="bg-white p-4 rounded border border-blue-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <div className="font-medium text-gray-900">Your Name</div>
              <div className="text-xs text-gray-500">Head of Growth at SIKRY</div>
            </div>
          </div>
          <div className="prose prose-sm text-gray-700">
            {`Hi {firstName},\n\nThanks for connecting! I noticed your work at {companyName} and thought you might be interested in...`}
          </div>
        </div>
      </div>
    </CardContent>
    <CardFooter className="bg-gray-50 border-t border-[#2A3050]/10 px-6 py-4">
      <div className="flex justify-end w-full gap-2">
        <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100">
          Save Draft
        </Button>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Next: Audience <ArrowUpRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </CardFooter>
  </Card>
</TabsContent>

<TabsContent value="sms" className="pt-8">
  <Card className="border border-[#2A3050]/10 shadow-lg overflow-hidden">
    <CardHeader className="bg-gradient-to-r from-[#1B1F3B]/5 to-[#2D325E]/5 border-b border-[#2A3050]/10">
      <CardTitle className="text-xl text-[#1B1F3B] flex items-center gap-2">
        <MessageCircle className="h-5 w-5 text-green-600" />
        SMS Campaign
      </CardTitle>
      <CardDescription className="text-[#3C4568]">
        Compose your SMS message. Keep it concise and engaging.
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-6 p-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="sms-message" className="text-[#1B1F3B] font-medium flex items-center gap-2">
            <Send className="h-4 w-4 text-green-600" />
            SMS Content
          </Label>
          <div className="bg-gray-50 px-3 py-2 border border-gray-300 border-b-0 rounded-t-md flex items-center gap-2">
            <button className="p-1 hover:bg-gray-200 rounded" title="Insert Tag">
              <Tags size={16} className="text-gray-600" />
            </button>
          </div>
          <Textarea
            id="sms-message"
            placeholder="Hi {firstName}, quick update from SIKRY regarding your recent inquiry..."
            className="min-h-[120px] border-[#2A3050]/20 focus:border-green-500 focus:ring-green-500 rounded-t-none border-t-0"
          />
          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-500">
              Available tags:{" "}
              <span className="inline-flex gap-1">
                <code className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-700">{`{firstName}`}</code>
                <code className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-700">{`{link}`}</code>
                <code className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-700">{`{promoCode}`}</code>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-700">1/1 segments</span>
              <span className="text-xs text-gray-500">0/160</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox id="include-optout" className="text-green-600 border-gray-300" />
          <Label htmlFor="include-optout" className="text-[#3C4568]">
            Include opt-out message (e.g., "Reply STOP to unsubscribe")
          </Label>
        </div>
      </div>

      <div className="bg-green-50 border border-green-100 rounded-lg p-4">
        <h4 className="text-sm font-medium text-green-800 mb-3 flex items-center gap-2">
          <Info className="h-4 w-4" />
          SMS Preview
        </h4>
        <div className="w-full max-w-[280px] mx-auto bg-gray-800 rounded-xl p-2 shadow-lg">
          <div className="bg-white rounded-lg overflow-hidden">
            <div className="bg-gray-100 px-3 py-2 border-b flex justify-between items-center">
              <div className="text-xs font-medium text-gray-700">+1 (555) 123-4567</div>
              <div className="text-xs text-gray-500">Now</div>
            </div>
            <div className="p-3">
              <div className="bg-blue-100 text-gray-800 p-2 rounded-lg max-w-[80%] mb-2">
                Hi {`{firstName}`}, your SIKRY promo code is {`{promoCode}`}. Redeem at {`{link}`}!
              </div>
              <div className="bg-gray-200 text-gray-800 p-2 rounded-lg max-w-[80%] ml-auto">
                STOP
              </div>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
    <CardFooter className="bg-gray-50 border-t border-[#2A3050]/10 px-6 py-4">
      <div className="flex justify-end w-full gap-2">
        <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100">
          Save Draft
        </Button>
        <Button className="bg-green-600 hover:bg-green-700">
          Next: Audience <ArrowUpRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </CardFooter>
  </Card>
</TabsContent>
      </Tabs>
      
      {/* ... Action Footer ... */}
       <div className="fixed bottom-0 left-[16rem] right-0 bg-white border-t border-[#2A3050]/10 py-4 px-6 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <span className="text-[#3C4568]">Ready to send to</span>
            <span className="font-bold text-[#1B1F3B] ml-2">{recipientsCount} recipients</span>
          </div>
          <div className="space-x-3">
            <Button variant="outline" className="border-[#2A3050]/20 text-[#1B1F3B] hover:bg-[#2A3050]/5">
              <Save className="h-4 w-4 mr-2" /> Save Draft
            </Button>
            <Button className="bg-gradient-to-r from-[#1B1F3B] to-[#2A3050] hover:from-[#2A3050] hover:to-[#3C4568]">
              <Send className="h-4 w-4 mr-2" /> Send Campaign
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}