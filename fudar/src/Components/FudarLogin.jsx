

import { Button } from "@shadcn/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@shadcn/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@shadcn/ui/form";
import { Input } from "@shadcn/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shadcn/ui/tabs";

export default function FudarLogin() {
//   const [, setLocation] = useLocation();
//   const { user, loginMutation, registerMutation } = useAuth();

//   useEffect(() => {
//     if (user) {
//       switch (user.role) {
//         case UserRole.ADMIN:
//           setLocation("/");
//           break;
//         case UserRole.STAFF:
//           setLocation("/staff");
//           break;
//         case UserRole.DELIVERY:
//           setLocation("/delivery");
//           break;
//       }
//     }
//   }, [user, setLocation]);

//   const loginForm = useForm({
    
//     defaultValues: {
//       username: "",
//       password: "",
//     },
//   });

//   const registerForm = useForm({
    
//     defaultValues: {
//       username: "",
//       password: "",
//       firstName: "",
//       lastName: "",
//       role: UserRole.DELIVERY,
//     },
//   });

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center p-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-2">
            <CardTitle className="text-3xl font-bold">Welcome</CardTitle>
            <CardDescription>
              Sign in to your account or create a new one
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <Form >
                  <form
                   
                    className="space-y-4"
                  >
                    <FormField
                      control={loginForm.control}
                      name="username"
                      render={() => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input  />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={() => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password"  />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={loginMutation.isPending}
                    >
                      {loginMutation.isPending ? "Logging in..." : "Login"}
                    </Button>
                  </form>
                </Form>
              </TabsContent>

              <TabsContent value="register">
                <Form >
                  <form
                    
                    className="space-y-4"
                  >
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        
                        name="firstName"
                        render={() => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input  />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        
                        name="lastName"
                        render={() => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input  />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {false && (
                      <FormField
                        
                        name="email"
                        render={() => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    <FormField
                      
                      name="username"
                      render={() => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input  />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="password"
                      render={() => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password"  />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="w-full"
                     
                    >
                      
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      <div className="hidden lg:flex flex-1 bg-primary items-center justify-center p-12">
        <div className="max-w-lg text-primary-foreground">
          <h1 className="text-4xl font-bold mb-6">
            Welcome to Our Logistics Platform
          </h1>
          <p className="text-lg opacity-90">
            Streamline your operations with our comprehensive logistics management
            system. Whether you're an admin, staff member, or delivery executive,
            we've got the tools you need to succeed.
          </p>
        </div>
      </div>
    </div>
  );
}