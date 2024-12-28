"use client";

import { useState } from "react";
import { User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import userData from "@/mockData/userData.json";


export function UserSearch() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredUsers = userData.users.filter((user) =>
    user.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <div className="relative flex items-center">
          <User className="absolute left-2 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Select Customer..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            className={`pl-8 ${query.length > 1 ? "pr-8" : ""} w-[200px]`}
            onFocus={() => setIsOpen(true)}
          />
          {query.length > 1 && (
            <button
              onClick={() => {
                setQuery("");
                setIsOpen(false);
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <Button size="icon" className="bg-lime-500 hover:bg-lime-500/80">
          <User className="h-4 w-4" />
        </Button>
      </div>

      {/* Search Results */}
      {isOpen && query && (
        <Card className="absolute z-50 mt-1 w-[200px] max-h-[300px] overflow-auto">
          <ul className="py-2">
            {filteredUsers.map((user) => (
              <li
                key={user.id}
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                onClick={() => {
                  setQuery(user.name);
                  setIsOpen(false);
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{user.name}</span>
                 
                  <span className="text-xs text-gray-500">ID:{" "}{user.id}</span>
                </div>
              </li>
            ))}
            {filteredUsers.length === 0 && (
              <li className="px-4 py-2 text-gray-500">No users found</li>
            )}
          </ul>
        </Card>
      )}
    </div>
  );
}
