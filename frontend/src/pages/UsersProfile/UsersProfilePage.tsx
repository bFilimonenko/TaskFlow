import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button.tsx';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog.tsx';
import { Separator } from '@/components/ui/separator';
import { UserForm } from '@/components/UserForm/UserForm.tsx';
import { useAuth } from '@/contexts/AuthContext';
import { CalendarIcon, Edit, MailIcon, MapPinIcon, UserCheck } from 'lucide-react';

const UsersProfilePage = () => {
  const { user } = useAuth();

  if (!user) return null;

  const fullName = `${user.firstName} ${user.lastName}`;
  const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();

  return (
    <div>
      <h2 className="font-bold text-2xl mb-4 ml-10">My Profile</h2>
      <Card className="shadow-lg py-1">
        <CardContent className="p-6">
          <div className="relative flex items-center gap-6 mb-6">
            <Avatar className="h-20 w-20 text-xl">
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>

            <div>
              <h1 className="text-3xl font-bold">{fullName}</h1>
              <Badge variant={user.isActive ? 'default' : 'destructive'} className="mt-1">
                {user.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="absolute -top-1 -right-1 hover:bg-blue-300"
                  variant="outline"
                  size="icon"
                >
                  <Edit />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <h1 className="text-2xl font-bold">Edit your profile</h1>
                <UserForm user={user} />
              </DialogContent>
            </Dialog>
          </div>

          <Separator className="my-4" />

          <div className="grid sm:grid-cols-2 gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-3">
              <MailIcon className="h-4 w-4 text-gray-500" />
              <span className="text-gray-800 dark:text-gray-200">{user.email}</span>
            </div>

            <div className="flex items-center gap-3">
              <MapPinIcon className="h-4 w-4 text-gray-500" />
              <span>{user.city || 'Not specified'}</span>
            </div>

            <div className="flex items-center gap-3">
              <CalendarIcon className="h-4 w-4 text-gray-500" />
              <span>{user.age ? `${user.age} y.o.` : 'Age unknown'}</span>
            </div>

            <div className="flex items-center gap-3">
              <UserCheck className="h-4 w-4 text-gray-500" />
              <span>Status: {user.isActive ? 'Active' : 'Inactive'}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersProfilePage;
