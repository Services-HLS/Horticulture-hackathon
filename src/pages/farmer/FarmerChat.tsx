import { useState, useEffect, useRef } from "react";
import { MessageSquare, Send, User, MapPin, Clock, Info, Loader2, Phone, Video, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { officerInfo, farmerQuickQueries, getAutoResponse, Message } from "@/data/chatData";

const FarmerChat = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            sender: "Horticulture Department",
            senderRole: "officer",
            content: "Namaskaram! How can I help you with your crops or market prices today?",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isMe: false
        }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = (text: string) => {
        if (!text.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            sender: "Me",
            senderRole: "farmer",
            content: text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isMe: true
        };

        setMessages(prev => [...prev, newMessage]);
        setInput("");
    };

    return (
        <div className="flex flex-col h-[calc(100vh-140px)] animate-slide-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                    <h1 className="page-header flex items-center gap-2">
                        <MessageSquare className="h-7 w-7 text-primary" />
                        Connect with Department
                    </h1>
                    <p className="page-subtitle">Get direct advisory and market price intelligence from the Horticulture Department</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="hidden sm:flex items-center gap-1 mr-4">
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary rounded-xl h-10 w-10 border bg-card/50 shadow-sm"><Phone className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary rounded-xl h-10 w-10 border bg-card/50 shadow-sm"><Video className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary rounded-xl h-10 w-10 border bg-card/50 shadow-sm"><Info className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary rounded-xl h-10 w-10 border bg-card/50 shadow-sm"><MoreVertical className="h-4 w-4" /></Button>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 py-1.5 px-3 shadow-sm">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse" />
                        Support Active
                    </Badge>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0">
                {/* Chat Main Area */}
                <div className="lg:col-span-4 flex flex-col bg-card border rounded-2xl shadow-sm overflow-hidden h-full">
                    {/* Messages Area */}
                    <div className="flex-1 p-6 overflow-y-auto" ref={scrollRef}>
                        <div className="space-y-6 max-w-4xl mx-auto">
                            {messages.map((m) => (
                                <div key={m.id} className={`flex ${m.isMe ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] flex flex-col ${m.isMe ? 'items-end' : 'items-start'}`}>
                                        <div className="flex items-center gap-2 mb-1 px-1">
                                            {!m.isMe && <span className="text-[10px] font-black uppercase tracking-widest text-primary">Department Hub</span>}
                                            <span className="text-[10px] text-muted-foreground font-medium">{m.timestamp}</span>
                                            {m.isMe && <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">My Query</span>}
                                        </div>
                                        <div className={`p-4 rounded-2xl shadow-sm text-sm font-medium leading-relaxed ${m.isMe
                                            ? 'bg-primary text-primary-foreground rounded-tr-none'
                                            : 'bg-muted/50 border rounded-tl-none text-foreground'
                                            }`}>
                                            {m.content}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Suggestions & Input */}
                    <div className="p-4 border-t bg-muted/10">
                        <div className="flex flex-wrap gap-2 mb-4 max-w-4xl mx-auto">
                            {farmerQuickQueries.map((q) => (
                                <button
                                    key={q}
                                    onClick={() => handleSend(q)}
                                    className="text-xs font-bold px-3 py-1.5 rounded-full bg-background border border-border hover:border-primary hover:text-primary transition-colors shadow-sm"
                                >
                                    {q}
                                </button>
                            ))}
                        </div>

                        <form
                            onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
                            className="flex gap-2 max-w-4xl mx-auto w-full"
                        >
                            <Input
                                placeholder="Type your question for the department..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="flex-1 bg-background h-12 rounded-xl focus-visible:ring-primary"
                            />
                            <Button type="submit" size="icon" className="h-12 w-12 rounded-xl shadow-md">
                                <Send className="h-5 w-5" />
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FarmerChat;
