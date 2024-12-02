"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Receipt,
  CreditCard,
  Settings,
  FolderKanban,
} from "lucide-react";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    label: "Projects",
    icon: FolderKanban,
    href: "/projects",
  },
  {
    label: "Expenses",
    icon: Receipt,
    href: "/expenses",
  },
  {
    label: "Pricing",
    icon: CreditCard,
    href: "/pricing",
  },
  {
    label: "Account",
    icon: Settings,
    href: "/account",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="h-full bg-gray-50 border-r">
      <div className="p-6">
        <Link href="/" className="flex items-center mb-8">
          <h1 className="text-xl font-semibold text-gray-900">
            Sanso AI
          </h1>
        </Link>
        <nav className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`flex items-center px-4 py-2 text-sm rounded-lg ${
                pathname === route.href
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <route.icon className="h-5 w-5 mr-3" />
              {route.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
} 