"use client";

import { useState } from "react";
import { PencilLineIcon } from "lucide-react";
import { registerNote } from "@/actions/register-note";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface NotesModalProps {
  userId: string;
}

export function NotesModal({ userId }: NotesModalProps) {
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");
  const [avaliationType, setAvaliationType] = useState<string | null>("");
  const [period, setPeriod] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean | null>(null);

  async function handleRegisterFrequency() {
    try {
      setLoading(true);

      const response = await registerNote({
        nota: note,
        dataAvaliacao: date,
        tipo: avaliationType!,
        periodo: period!,
        userId,
      });

      if (!response.success) {
        alert(response.error);
        console.error(response.error);
        return;
      }

      alert("Nota registrada com sucesso!");
      window.location.reload();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button title="Registrar Nota" size={"icon"}>
            <PencilLineIcon />
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Registrar Nota</DialogTitle>
          <DialogDescription>Preencha todas as informações.</DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <Label htmlFor="note">Nota</Label>
          <Input
            id="note"
            name="note"
            type="text"
            maxLength={3}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="frequencyDate">Data</Label>
          <Input
            id="frequencyDate"
            name="date"
            type="date"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-2 w-full">
            <Label htmlFor="username-1">Tipo</Label>
            <Select onValueChange={setAvaliationType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione a o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="teorica">Teórica</SelectItem>
                <SelectItem value="pratica">Prática</SelectItem>
                <SelectItem value="seminario">Seminário</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="username-1">Período</Label>
            <Select onValueChange={setPeriod}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Marque o período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancelar</Button>} />
          <Button
            onClick={handleRegisterFrequency}
            disabled={!date || !avaliationType || !period || loading!}
            className="disabled:cursor-not-allowed"
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
