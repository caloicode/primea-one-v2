"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import Image from "next/image";

type User = {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
};

type Props = {
  selected: string[]; // array of user IDs (uuid[])
  onChange: (ids: string[]) => void;
};

export default function GroupSelector({ selected, onChange }: Props) {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");

  const supabase = createClient();

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.rpc("get_all_users");
      if (!error && data) setAllUsers(data);
    };
    fetchUsers();
  }, []);

  const filtered = allUsers.filter((user) =>
    (user.full_name || "").toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (id: string) => {
    if (!selected.includes(id)) {
      onChange([...selected, id]);
    }
    setSearch("");
  };

  const handleRemove = (id: string) => {
    onChange(selected.filter((uid) => uid !== id));
  };

  const getUserById = (id: string) => allUsers.find((u) => u.id === id);

  return (
    <div className="space-y-3">
      {/* Selected Users as Chips */}
      <div className="flex flex-wrap gap-2">
        {selected.map((id) => {
          const user = getUserById(id);
          return (
            <Badge
              key={id}
              className="flex items-center gap-2 px-2 py-1 rounded-full"
            >
              {user?.avatar_url && (
                <Image
                  src={user.avatar_url}
                  alt={user.full_name || ""}
                  width={16}
                  height={16}
                  className="rounded-full"
                />
              )}
              <span>{user?.full_name || "Unknown"}</span>
              <button
                type="button"
                onClick={() => handleRemove(id)}
                className="ml-1 text-xs"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          );
        })}
      </div>

      {/* Input Field */}
      <Input
        placeholder="Search users by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Dropdown Search Results */}
      {search && (
        <div className="border rounded p-2 mt-1 bg-muted max-h-40 overflow-auto text-sm">
          {filtered.map((user) => (
            <div
              key={user.id}
              className="cursor-pointer hover:bg-accent px-2 py-1 rounded flex items-center gap-2"
              onClick={() => handleSelect(user.id)}
            >
              {user.avatar_url && (
                <Image
                  src={user.avatar_url}
                  alt={user.full_name || ""}
                  width={20}
                  height={20}
                  className="rounded-full"
                />
              )}
              <span>{user.full_name}</span>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-muted-foreground px-2 py-1 italic">
              No matching users
            </div>
          )}
        </div>
      )}
    </div>
  );
}
