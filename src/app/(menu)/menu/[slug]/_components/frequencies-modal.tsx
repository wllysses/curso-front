"use client";

import { registerFrequency } from "@/actions/register-frequency";
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
import { NotebookPenIcon } from "lucide-react";
import { useState } from "react";

interface FrequenciesModalProps {
  userId: string;
}

export function FrequenciesModal({ userId }: FrequenciesModalProps) {
  const [date, setDate] = useState("");
  const [cargaHoraria, setCargaHoraria] = useState<string | null>("");
  const [presenca, setPresenca] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean | null>(null);

  async function handleRegisterFrequency() {
    try {
      setLoading(true);

      const response = await registerFrequency({
        date,
        cargaHoraria: Number(cargaHoraria),
        presenca: presenca === "Sim" ? true : false,
        userId,
      });

      if (!response.success) {
        alert(response.error);
        console.error(response.error);
        return;
      }

      alert("Frequência registrada com sucesso!");
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
          <Button title="Registrar Frequência" size={"icon"}>
            <NotebookPenIcon />
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Registrar Frequência</DialogTitle>
          <DialogDescription>Preencha todas as informações.</DialogDescription>
        </DialogHeader>
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
            <Label htmlFor="username-1">Carga Horária</Label>
            <Select onValueChange={setCargaHoraria}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione a carga horária" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem></SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="0">0</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="username-1">Presença</Label>
            <Select onValueChange={setPresenca}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Marque a presença" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Sim">Sim</SelectItem>
                <SelectItem value="Não">Não</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancelar</Button>} />
          <Button
            onClick={handleRegisterFrequency}
            disabled={!date || !cargaHoraria || !presenca || loading!}
            className="disabled:cursor-not-allowed"
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
