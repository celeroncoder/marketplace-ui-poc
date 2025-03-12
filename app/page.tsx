"use client";

import React, { useState, useEffect } from "react";
import { Search, InfoIcon, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface KnowledgeBase {
  id: string;
  title: string;
  description: string;
  logo: string;
  status: "subscribed" | "coming_soon";
  authority: string;
}

const MarketplaceUI: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [knowledgeBases, setKnowledgeBases] = useState<KnowledgeBase[]>([
    {
      id: "1",
      title: "VARA Rulebook",
      description:
        "Comprehensive regulations from the Virtual Assets Regulatory Authority (VARA) for virtual assets in Dubai.",
      logo: "/logos/vara-logo.svg",
      status: "coming_soon",
      authority: "VARA",
    },
    {
      id: "2",
      title: "Central Bank UAE Regulations",
      description:
        "Official regulatory framework and guidelines from the UAE Central Bank.",
      logo: "/logos/central-bank-logo.svg",
      status: "coming_soon",
      authority: "Central Bank UAE",
    },
    {
      id: "3",
      title: "DFSA Rulebook",
      description:
        "Dubai Financial Services Authority comprehensive rules and regulations for the DIFC.",
      logo: "/logos/dfsa-logo.svg",
      status: "coming_soon",
      authority: "DFSA",
    },
    {
      id: "4",
      title: "SCA Regulations",
      description:
        "Securities and Commodities Authority guidelines for financial markets in the UAE.",
      logo: "/logos/sca-logo.svg",
      status: "coming_soon",
      authority: "SCA",
    },
    {
      id: "5",
      title: "ADGM Rulebook",
      description:
        "Abu Dhabi Global Market financial regulations and legal framework.",
      logo: "/logos/adgm-logo.svg",
      status: "coming_soon",
      authority: "ADGM",
    },
  ]);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Commented out toggle functionality for future implementation
  /*
  const handleSubscriptionToggle = (id: string) => {
    setKnowledgeBases(
      knowledgeBases.map((kb) =>
        kb.id === id
          ? {
              ...kb,
              status:
                kb.status === "subscribed" ? "coming_soon" : "subscribed",
            }
          : kb
      )
    );
  };
  */

  const filteredKnowledgeBases = knowledgeBases.filter(
    (kb) =>
      kb.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kb.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kb.authority.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 flex justify-center items-center h-[70vh]">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-muted-foreground">Loading marketplace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold mb-2">Knowledge Base Marketplace</h2>
        <p className="text-muted-foreground mb-6">
          Discover and subscribe to regulatory knowledge bases to enhance your
          compliance insights
        </p>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search knowledge bases by title, description or authority..."
            className="pl-10 transition-all duration-200 border-muted-foreground/20 focus:border-primary h-12"
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchQuery(e.target.value)
            }
          />
        </div>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredKnowledgeBases.map((kb) => (
          <motion.div key={kb.id} variants={item}>
            <Card className="overflow-hidden h-full border border-muted-foreground/20 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
              <CardHeader className="p-5 pb-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {/* Logo instead of image */}
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10">
                      <img
                        src={kb.logo}
                        alt={`${kb.authority} logo`}
                        className="w-6 h-6 object-contain"
                        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                          // Fallback to initials if logo fails to load
                          e.currentTarget.style.display = "none";
                          e.currentTarget.nextSibling!.classList.remove("hidden");
                        }}
                      />
                      <span className="hidden text-sm font-bold text-primary">
                        {kb.authority.split(" ").map(word => word[0]).join("")}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">{kb.title}</h4>
                      <p className="text-xs text-muted-foreground font-medium">
                        {kb.authority}
                      </p>
                    </div>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="h-4 w-4 text-muted-foreground cursor-pointer" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-64">{kb.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </CardHeader>
              <CardContent className="p-5 pt-3 flex-grow">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {kb.description}
                </p>
              </CardContent>
              <CardFooter className="p-5 pt-0">
                <div className="w-full flex items-center justify-between">
                  <Badge variant="secondary" className="font-medium">
                    Coming Soon
                  </Badge>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="text-xs"
                  >
                    Notify Me
                  </Button>
                  {/* Subscription toggle functionality for future implementation
                  <span className="text-sm font-medium">
                    {kb.status === "subscribed" ? (
                      <span className="flex items-center text-green-600">
                        <CheckCircle className="h-4 w-4 mr-1.5" />
                        Subscribed
                      </span>
                    ) : (
                      "Not subscribed"
                    )}
                  </span>
                  <Switch
                    checked={kb.status === "subscribed"}
                    onCheckedChange={() => handleSubscriptionToggle(kb.id)}
                    aria-label={`Toggle subscription for ${kb.title}`}
                  />
                  */}
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {filteredKnowledgeBases.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mt-12 p-10 border border-dashed rounded-lg border-muted-foreground/30"
        >
          <Search className="h-12 w-12 mx-auto text-muted-foreground opacity-50 mb-4" />
          <p className="text-xl font-medium text-muted-foreground mb-2">
            No knowledge bases match your search
          </p>
          <p className="text-muted-foreground">
            Try using different keywords or browse all available knowledge bases
          </p>
          <Button
            variant="outline"
            className="mt-6"
            onClick={() => setSearchQuery("")}
          >
            View All Knowledge Bases
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default MarketplaceUI;