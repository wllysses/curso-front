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
import { welcomeMessage } from "@/utils/welcome";
import { FrequenciesModal } from "./_components/frequencies-modal";
import { NotesModal } from "./_components/notes-modal";
import { calculateStudentAverage } from "@/utils/average";
import { calculateStudentFrequencies } from "@/utils/frequency";
import { UserPlus, UserX } from "lucide-react";

export default async function MenuPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const users = await prisma.user.findMany({
    where: {
      role: "STUDENT",
    },
    include: {
      frequencias: true,
      notas: true,
    },
  });

  const user = await prisma.user.findFirst({
    where: {
      id: slug,
    },
    include: {
      notas: true,
      frequencias: true,
    },
  });

  return (
    <div className="container mx-auto">
      <header className="flex pt-2 justify-end">
        <SignOutButton />
      </header>

      <main className="mt-6">
        <Card className="p-4">
          <div className="flex flex-col gap-2">
            <h1 className="font-bold">{welcomeMessage()},</h1>
            <div className="flex justify-between">
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
              <p className="font-bold text-primary">
                {user?.role === "STUDENT" ? "Estudante" : "Professor"}
              </p>
            </div>
          </div>
        </Card>

        {user?.role === "TEACHER" && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-lg">Visualizar Estudantes</CardTitle>
              <CardDescription>
                Visualize e gerencie seus estudantes.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="rounded border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead></TableHead>
                      <TableHead>Nome</TableHead>
                      <TableHead>E-mail</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Presenças</TableHead>
                      <TableHead>Faltas</TableHead>
                      <TableHead>Média</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <Avatar>
                            <AvatarFallback>{user.name![0]}</AvatarFallback>
                            <AvatarImage src={user?.image as string} />
                          </Avatar>
                        </TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>
                          {calculateStudentFrequencies(user.frequencias, true)}
                        </TableCell>
                        <TableCell>
                          {" "}
                          {calculateStudentFrequencies(user.frequencias, false)}
                        </TableCell>
                        <TableCell>
                          {calculateStudentAverage(user.notas)}
                        </TableCell>
                        <TableCell className="flex gap-2">
                          <NotesModal userId={user.id!} />
                          <FrequenciesModal userId={user.id!} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}

        {user?.role === "STUDENT" && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-lg">Visualizar Informações</CardTitle>
              <CardDescription>
                Acesse suas notas e frequências durante o curso.
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
                                {new Date(
                                  info.dataAvaliacao,
                                ).toLocaleDateString("pt-BR")}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value={"frequencias"}>
                  <div className="flex gap-4 items-center justify-end">
                    <Card className="max-w-37.5 w-full">
                      <CardHeader>
                        <UserPlus />
                        <CardTitle>Presenças</CardTitle>
                      </CardHeader>
                      <CardContent className="text-green-500 font-bold text-2xl">
                        {calculateStudentFrequencies(user.frequencias, true)}
                      </CardContent>
                    </Card>
                    <Card className="max-w-37.5 w-full">
                      <CardHeader>
                        <UserX />
                        <CardTitle>Faltas</CardTitle>
                      </CardHeader>
                      <CardContent className="text-red-500 font-bold text-2xl">
                        {calculateStudentFrequencies(user.frequencias, false)}
                      </CardContent>
                    </Card>
                  </div>
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
                                {new Date(info.data).toLocaleDateString(
                                  "pt-BR",
                                )}
                              </TableCell>
                              <TableCell>
                                {info.presenca ? "Sim" : "Não"}
                              </TableCell>
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
        )}
      </main>
    </div>
  );
}
