import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Bell, Calendar, LogOut, Settings, User, Plus } from 'lucide-react';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const unreadNotifications = user?.notifications?.filter(n => !n.read).length || 0;

  return (
    <header className="bg-black/95 backdrop-blur-md border-b border-green-500/30 sticky top-0 z-50 shadow-lg shadow-green-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-green-500/30 transition-all duration-300 group-hover:shadow-green-500/50 group-hover:scale-110">
                <span className="text-white font-bold text-sm">YU</span>
              </div>
              <span className="text-xl font-bold text-white group-hover:text-green-400 transition-colors duration-300">
                Yuno
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/events" 
              className="text-gray-300 hover:text-green-400 transition-colors duration-300 relative group"
            >
              Events
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              to="/calendar" 
              className="text-gray-300 hover:text-green-400 transition-colors duration-300 relative group"
            >
              Calendar
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            {isAuthenticated && (
              <Link 
                to="/dashboard" 
                className="text-gray-300 hover:text-green-400 transition-colors duration-300 relative group"
              >
                Dashboard
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            )}
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* Create Event Button for Faculty/Admin */}
                {(user?.role === 'faculty' || user?.role === 'admin') && (
                  <Button
                    onClick={() => navigate('/create-event')}
                    className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white border-0 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Event
                  </Button>
                )}

                {/* Notifications */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative text-gray-300 hover:text-green-400 hover:bg-gray-800/50 transition-all duration-300">
                      <Bell className="w-5 h-5" />
                      {unreadNotifications > 0 && (
                        <Badge className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center text-xs bg-red-500 text-white border-2 border-black">
                          {unreadNotifications}
                        </Badge>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80 bg-gray-900 border-gray-700 text-white">
                    <DropdownMenuLabel className="text-green-400">Notifications</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-gray-700" />
                    {user?.notifications?.length > 0 ? (
                      user.notifications.slice(0, 5).map((notification) => (
                        <DropdownMenuItem key={notification.id} className="p-3 hover:bg-gray-800 transition-colors duration-200">
                          <div className="flex flex-col space-y-1">
                            <p className="text-sm text-gray-200">{notification.message}</p>
                            <p className="text-xs text-gray-400">
                              {notification.type === 'success' && '✅ '}
                              {notification.type === 'info' && 'ℹ️ '}
                              {notification.type === 'warning' && '⚠️ '}
                              Just now
                            </p>
                          </div>
                        </DropdownMenuItem>
                      ))
                    ) : (
                      <DropdownMenuItem className="hover:bg-gray-800 transition-colors duration-200">
                        <p className="text-sm text-gray-400">No notifications</p>
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full hover:bg-gray-800/50 transition-all duration-300">
                      <Avatar className="h-8 w-8 border-2 border-green-500/30">
                        <AvatarImage src={user?.profilePicture} alt={user?.name} />
                        <AvatarFallback className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
                          {getInitials(user?.name || '')}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-gray-900 border-gray-700 text-white">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none text-white">{user?.name}</p>
                        <p className="text-xs leading-none text-gray-400">
                          {user?.email}
                        </p>
                        <Badge variant="outline" className="w-fit mt-1 border-green-500/30 text-green-400">
                          {user?.role}
                        </Badge>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-gray-700" />
                    <DropdownMenuItem onClick={() => navigate('/profile')} className="hover:bg-gray-800 transition-colors duration-200">
                      <User className="mr-2 h-4 w-4 text-green-400" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/dashboard')} className="hover:bg-gray-800 transition-colors duration-200">
                      <Calendar className="mr-2 h-4 w-4 text-green-400" />
                      <span>Dashboard</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/settings')} className="hover:bg-gray-800 transition-colors duration-200">
                      <Settings className="mr-2 h-4 w-4 text-green-400" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-700" />
                    <DropdownMenuItem onClick={handleLogout} className="hover:bg-gray-800 transition-colors duration-200 text-red-400 hover:text-red-300">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  onClick={() => navigate('/login')}
                  className="text-gray-300 hover:text-green-400 hover:bg-gray-800/50 transition-all duration-300"
                >
                  Login
                </Button>
                <Button
                  onClick={() => navigate('/register')}
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white border-0 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300"
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;