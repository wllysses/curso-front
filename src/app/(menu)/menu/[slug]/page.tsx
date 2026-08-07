import { SignOutButton } from "@/components/signout-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { prisma } from "@/lib/prisma";

interface Props {
  params: {
    slug: string;
  };
}

export default async function MenuPage({ params: { slug } }: Props) {
  const user = await prisma.user.findFirst({
    where: {
      id: slug,
    },
    include: {
      notas: true,
      frequencias: true,
    },
  });

  function welcomeMessage() {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      return "Bom Dia";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "Boa Tarde";
    } else {
      return "Bom Noite";
    }
  }

  return (
    <div className="container mx-auto">
      <header className="flex pt-2 justify-end">
        <SignOutButton />
      </header>

      <main className="mt-6">
        <Card className="p-4">
          <div className="flex flex-col gap-2">
            <h1 className="font-bold">{welcomeMessage()},</h1>
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarFallback>{user?.name![0]}</AvatarFallback>
                <AvatarImage src={user?.image as string} />
              </Avatar>
              <div>
                <h2 className="font-semibold">{user?.name}</h2>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">Visualizar Informações</CardTitle>
            <CardDescription>
              Acesse suas notas e frequências durante o curso
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="notas" className={"flex-col gap-6"}>
              <TabsList>
                <TabsTrigger value={"notas"}>Notas</TabsTrigger>
                <TabsTrigger value={"frequencias"}>Frequências</TabsTrigger>
              </TabsList>
              <TabsContent value={"notas"}>
                <h3 className="font-semibold text-lg mb-2">Notas</h3>
                {!user?.notas.length ? (
                  <p>Nenhuma nota registrada.</p>
                ) : (
                  <div className="border rounded">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Período</TableHead>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Nota</TableHead>
                          <TableHead>Data da Avaliação</TableHead>
                        </TableRow>
                      </TableHeader>

                      <TableBody>
                        {user?.notas.map((info) => (
                          <TableRow key={info.id}>
                            <TableCell>{info.periodo}</TableCell>
                            <TableCell>{info.tipo}</TableCell>
                            <TableCell>{info.nota}</TableCell>
                            <TableCell>
                              {new Date(info.dataAvaliacao).toLocaleDateString(
                                "pt-BR",
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </TabsContent>

              <TabsContent value={"frequencias"}>
                <h3 className="font-semibold text-lg mb-2">Frequências</h3>
                {!user?.frequencias.length ? (
                  <p>Nenhuma frequência registrada.</p>
                ) : (
                  <div className="border rounded">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Carga Horária</TableHead>
                          <TableHead>Data</TableHead>
                          <TableHead>Presença</TableHead>
                        </TableRow>
                      </TableHeader>

                      <TableBody>
                        {user?.frequencias.map((info) => (
                          <TableRow key={info.id}>
                            <TableCell>{info.cargaHoraria}</TableCell>
                            <TableCell>
                              {new Date(info.data).toLocaleDateString("pt-BR")}
                            </TableCell>
                            <TableCell>{info.presenca}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
