import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Home, 
  BarChart3, 
  MessageSquare, 
  Target, 
  User, 
  Settings, 
  LogOut,
  Menu
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { user, isAuthenticated } = useAuth();
  const [location] = useLocation();

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Assessment", href: "/assessment", icon: Target },
    { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
    { name: "AI Coach", href: "/chat", icon: MessageSquare },
  ];

  const isActive = (href: string) => {
    if (href === "/" && location === "/") return true;
    if (href !== "/" && location.startsWith(href)) return true;
    return false;
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg p-1" tabIndex={0} role="button" aria-label="SkillMate - Go to homepage">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
                SM
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">SkillMate</span>
            </div>
          </Link>

          {/* Navigation Links - Desktop */}
          {isAuthenticated && (
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <div className={cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                    isActive(item.href)
                      ? "bg-primary text-white"
                      : "text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700"
                  )} tabIndex={0} role="button" aria-label={`Navigate to ${item.name}`}>
                    <item.icon className="w-4 h-4" aria-hidden="true" />
                    <span>{item.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.profileImageUrl} alt={user?.firstName} />
                      <AvatarFallback>
                        {user?.firstName?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : 'User'}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <a href="/api/logout" className="w-full">Log out</a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-4">
                <Button variant="ghost" asChild>
                  <a href="/api/login" className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md" aria-label="Sign in to your account">Sign In</a>
                </Button>
                <Button asChild>
                  <a href="/api/login" className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md" aria-label="Get started with SkillMate for free">Get Started Free</a>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isAuthenticated && (
        <div className="md:hidden border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <div className={cn(
                  "flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors",
                  isActive(item.href)
                    ? "bg-primary text-white"
                    : "text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700"
                )} tabIndex={0} role="button" aria-label={`Navigate to ${item.name}`}>
                  <item.icon className="w-5 h-5" aria-hidden="true" />
                  <span>{item.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
