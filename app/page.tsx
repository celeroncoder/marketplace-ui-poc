"use client";

import React, { useState, useEffect } from "react";
import { Search, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface KnowledgeBase {
  id: string;
  title: string;
  description: string;
  image: string;
  status: "subscribed" | "coming_soon";
  authority: string;
}

const MarketplaceUI: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const knowledgeBases: KnowledgeBase[] = [
    {
      id: "1",
      title: "VARA Rulebook",
      description:
        "Comprehensive regulations from the Virtual Assets Regulatory Authority (VARA) for virtual assets in Dubai.",
      image: "/images/vara.png",
      status: "subscribed",
      authority: "VARA",
    },
    {
      id: "2",
      title: "Central Bank UAE Regulations",
      description:
        "Official regulatory framework and guidelines from the UAE Central Bank.",
      image: "/images/central-bank.png",
      status: "subscribed",
      authority: "Central Bank UAE",
    },
    {
      id: "3",
      title: "DFSA Rulebook",
      description:
        "Dubai Financial Services Authority comprehensive rules and regulations for the DIFC.",
      image: "/images/dfsa.png",
      status: "subscribed",
      authority: "DFSA",
    },
    {
      id: "4",
      title: "SCA Regulations",
      description:
        "Securities and Commodities Authority guidelines for financial markets in the UAE.",
      image: "/images/sca.png",
      status: "coming_soon",
      authority: "SCA",
    },
    {
      id: "5",
      title: "ADGM Rulebook",
      description:
        "Abu Dhabi Global Market financial regulations and legal framework.",
      image: "/images/adgm.png",
      status: "coming_soon",
      authority: "ADGM",
    },
  ];

  const filteredKnowledgeBases = knowledgeBases.filter(
    (kb) =>
      kb.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kb.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kb.authority.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
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
              <div className="h-48 overflow-hidden relative">
                <img
                  src={kb.image}
                  alt={kb.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    e.currentTarget.src =
                      "https://placehold.co/600x400?text=Authority+Image";
                  }}
                />
                <div className="absolute top-3 right-3">
                  <Badge
                    variant={
                      kb.status === "subscribed" ? "success" : "secondary"
                    }
                    className="font-medium shadow-sm"
                  >
                    {kb.status === "subscribed" ? "Subscribed" : "Coming Soon"}
                  </Badge>
                </div>
              </div>
              <CardHeader className="p-5 pb-0">
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold text-lg">{kb.title}</h4>
                </div>
                <p className="text-xs text-muted-foreground font-medium mt-1">
                  {kb.authority}
                </p>
              </CardHeader>
              <CardContent className="p-5 pt-3 flex-grow">
                <p className="text-sm text-muted-foreground">
                  {kb.description}
                </p>
              </CardContent>
              <CardFooter className="p-5 pt-0">
                <Button
                  variant={kb.status === "subscribed" ? "outline" : "default"}
                  className="w-full transition-all duration-200 hover:scale-[1.02]"
                  disabled={kb.status === "coming_soon"}
                >
                  {kb.status === "subscribed" ? (
                    <>
                      View Knowledge Base{" "}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    "Notify Me"
                  )}
                </Button>
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
