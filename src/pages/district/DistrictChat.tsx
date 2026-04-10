import { useState, useEffect, useRef } from "react";
import { MessageSquare, Send, User, Search, Users, MoreVertical, Loader2, Phone, Video, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { dummyFarmerChats, dummyOfficerChats, ChatSession, Message } from "@/data/chatData";

const DistrictChat = () => {
    const [activeTab, setActiveTab] = useState<"farmer" | "officer">("farmer");
    const [selectedSessionId, setSelectedSessionId] = useState<string>(dummyFarmerChats[0].id);
    const [farmerChats, setFarmerChats] = useState<ChatSession[]>(dummyFarmerChats);
    const [officerChats, setOfficerChats] = useState<ChatSession[]>(dummyOfficerChats);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const activeSessions = activeTab === "farmer" ? farmerChats : officerChats;
    const currentSession = activeSessions.find(s => s.id === selectedSessionId) || activeSessions[0];

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [currentSession, isTyping]);

    const handleTabChange = (val: string) => {
        const tab = val as "farmer" | "officer";
        setActiveTab(tab);
        setSelectedSessionId(tab === "farmer" ? farmerChats[0].id : officerChats[0].id);
    };

    const handleSend = () => {
        if (!input.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            sender: "Sri. Venkata Rao",
            senderRole: "officer",
            content: input,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isMe: true
        };

        const updateMessages = (sessions: ChatSession[]) => {
            return sessions.map(s => {
                if (s.id === selectedSessionId) {
                    return {
                        ...s,
                        lastMessage: input,
                        timestamp: "Just now",
                        messages: [...s.messages, newMessage]
                    };
                }
                return s;
            });
        };

        if (activeTab === "farmer") {
            setFarmerChats(updateMessages(farmerChats));
        } else {
            setOfficerChats(updateMessages(officerChats));
        }

        setInput("");

        setInput("");
    };

    return (
        <div className="flex flex-col h-[calc(100vh-140px)] animate-slide-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                    <h1 className="page-header flex items-center gap-2">
                        <MessageSquare className="h-7 w-7 text-primary" />
                        Farmer Communication Center
                    </h1>
                    <p className="page-subtitle">Manage farmer advisory and peer officer coordination</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 bg-card border rounded-2xl shadow-sm overflow-hidden flex-1 min-h-0">
                {/* Left Panel - Conversation List */}
                <div className="lg:col-span-1 border-r flex flex-col h-full bg-muted/5">
                    <div className="p-4 border-b space-y-4">
                        <Tabs defaultValue="farmer" onValueChange={handleTabChange} className="w-full">
                            <TabsList className="grid w-full grid-cols-2 bg-muted/50 rounded-lg p-1">
                                <TabsTrigger value="farmer" className="text-xs font-black uppercase tracking-widest py-2 rounded-md transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Farmers</TabsTrigger>
                                <TabsTrigger value="officer" className="text-xs font-black uppercase tracking-widest py-2 rounded-md transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Officers</TabsTrigger>
                            </TabsList>
                        </Tabs>

                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search messages..." className="pl-9 bg-background h-10 rounded-xl" />
                        </div>
                    </div>

                    <ScrollArea className="flex-1">
                        <div className="divide-y">
                            {activeSessions.map((session) => (
                                <div
                                    key={session.id}
                                    onClick={() => setSelectedSessionId(session.id)}
                                    className={`p-4 cursor-pointer transition-all hover:bg-primary/5 flex items-start gap-4 ${selectedSessionId === session.id ? 'bg-primary/10 border-l-4 border-primary' : ''}`}
                                >
                                    <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center border border-primary/10 shrink-0 font-black text-primary">
                                        {session.userName[0]}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-center mb-0.5">
                                            <h4 className="font-black text-sm text-foreground truncate">{session.userName}</h4>
                                            <span className="text-[10px] text-muted-foreground font-bold">{session.timestamp}</span>
                                        </div>
                                        <p className="text-[10px] font-bold text-primary italic mb-1 truncate">{session.description}</p>
                                        <p className="text-xs text-muted-foreground truncate font-medium">
                                            {session.lastMessage}
                                        </p>
                                    </div>
                                    {session.unreadCount > 0 && (
                                        <Badge className="bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center p-0 text-[10px] shadow-sm">
                                            {session.unreadCount}
                                        </Badge>
                                    )}
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </div>

                {/* Right Panel - Chat Area */}
                <div className="lg:col-span-3 flex flex-col h-full bg-background relative">
                    {/* Chat Header */}
                    <div className="p-4 border-b flex items-center justify-between bg-card text-card-foreground">
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-black">
                                {currentSession.userName[0]}
                            </div>
                            <div>
                                <h3 className="font-black text-sm">{currentSession.userName}</h3>
                                <p className="text-[10px] text-muted-foreground font-bold flex items-center gap-1">
                                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" /> Online
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary rounded-xl"><Phone className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary rounded-xl"><Video className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary rounded-xl"><Info className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary rounded-xl"><MoreVertical className="h-4 w-4" /></Button>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 p-6 bg-muted/5 overflow-y-auto" ref={scrollRef}>
                        <div className="space-y-6">
                            {currentSession.messages.map((m) => (
                                <div key={m.id} className={`flex ${m.isMe ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[70%] flex flex-col ${m.isMe ? 'items-end' : 'items-start'}`}>
                                        <div className="flex items-center gap-2 mb-1 px-1">
                                            {!m.isMe && <span className="text-[10px] font-black uppercase tracking-widest text-primary">{m.sender}</span>}
                                            <span className="text-[10px] text-muted-foreground font-medium">{m.timestamp}</span>
                                            {m.isMe && <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Officer</span>}
                                        </div>
                                        <div className={`p-3.5 rounded-2xl shadow-sm text-sm font-medium leading-relaxed ${m.isMe
                                            ? 'bg-primary text-primary-foreground rounded-tr-none'
                                            : 'bg-card border rounded-tl-none text-foreground'
                                            }`}>
                                            {m.content}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-card border-t pt-2">
                        <div className="flex gap-2 p-2 bg-muted/10 rounded-xl mb-2 items-center overflow-x-auto no-scrollbar">
                            <span className="text-[10px] font-black text-primary whitespace-nowrap px-2">QUICK REPLIES:</span>
                            {["Check mandi price", "Price expected to increase", "Harvest after 3 days", "Sell in Madanapalle"].map(qr => (
                                <Badge
                                    key={qr}
                                    variant="outline"
                                    className="bg-background text-[10px] font-bold py-1 cursor-pointer hover:border-primary transition-all whitespace-nowrap"
                                    onClick={() => setInput(qr)}
                                >
                                    {qr}
                                </Badge>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <Input
                                placeholder="Type your message..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                className="flex-1 bg-background h-12 rounded-xl border-muted focus-visible:ring-primary shadow-inner"
                            />
                            <Button onClick={handleSend} size="icon" className="h-12 w-12 rounded-xl shadow-md">
                                <Send className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DistrictChat;
