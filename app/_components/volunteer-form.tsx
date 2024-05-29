"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Label } from "./ui/label";

const formSchema = z.object({
  name: z.string().min(1, { message: "Digite seu nome completo" }),
  cpf: z.string().min(9, { message: "Digite seu CPF" }).refine((cpf: string) => {
    if (typeof cpf !== "string") return false;
    cpf = cpf.replace(/[^\d]+/g, "");
    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;
    const cpfDigits = cpf.split("").map((el) => +el);
    const rest = (count: number): number => {
      return (((cpfDigits.slice(0, count - 12).reduce((soma, el, index) => soma + el * (count - index), 0) * 10) % 11) % 10);
    };
    return rest(10) === cpfDigits[9] && rest(11) === cpfDigits[10];
  }, "Digite um cpf válido."),
  rg: z.string().min(1, { message: "Digite seu RG" }),
  councilNumber: z.string().min(1, { message: "Digite o número do conselho" }),
  councilName: z.string().min(1, { message: "Digite o nome do conselho" }),
  volunteerType: z.string().min(1, { message: "Tipo de voluntário ex: Bombeiro, médico, enfermeiro..." }),
  haveProject: z.enum(["Sim", "Não"]),
  project: z.string().optional(),
  phoneNumber: z.string().min(9, { message: "Digite o um telefone para contato" }),
  emailAddress: z.string().min(1, { message: "Digite seu email" }).email().min(4, { message: "Digite seu email" }),
})


const VolunteerForm = () => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      cpf: "",
      rg: "",
      councilNumber: "",
      councilName: "",
      volunteerType: "",
      project: "",
      phoneNumber: "",
      emailAddress: "",
    }
  })

  const haveProject = form.watch("haveProject");

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch('https://airvolunteer-dev-drb3l7wtqa-rj.a.run.app/volunteer/postvolunteerInfo/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`Error submitting form: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Form submission response:', data);


    } catch (error) {
      console.error('Error submitting form:', error);


    }
  };

  return (
    <div className="flex flex-col items-center justify-between p-24">
      <h1 className="font-bold text-white text-3xl py-8">Cadastro de Voluntários</h1>
      <Form {...form} >
        <form onSubmit={form.handleSubmit(handleSubmit)} className="max-w-md w-full flex flex-col gap-4 text-white">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => {
              return <FormItem >
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nome completo"
                    className="shadow-black shadow-md text-gray-600"
                    type="text"
                    {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            }}
          />

          <FormField
            control={form.control}
            name="cpf"
            render={({ field }) => {
              return <FormItem>
                <FormLabel>CPF</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Número do CPF"
                    className="shadow-black shadow-md text-gray-600"
                    type="number"
                    {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            }}
          />

          <FormField
            control={form.control}
            name="rg"
            render={({ field }) => {
              return <FormItem>
                <FormLabel>RG</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Número do RG"
                    className="shadow-black shadow-md text-gray-600"
                    type="number"
                    {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            }}
          />

          <FormField
            control={form.control}
            name="councilNumber"
            render={({ field }) => {
              return <FormItem>
                <FormLabel>Número do Conselho</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Número do registro do conselho que atua"
                    className="shadow-black shadow-md text-gray-600"
                    type="number"
                    {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            }}
          />

          <FormField
            control={form.control}
            name="councilName"
            render={({ field }) => {
              return <FormItem>
                <FormLabel>Nome do Conselho</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nome do conselho que atua"
                    className="shadow-black shadow-md text-gray-600"
                    type="text"
                    {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            }}
          />

          <FormField
            control={form.control}
            name="volunteerType"
            render={({ field }) => {
              return <FormItem>
                <FormLabel>Tipo de Voluntário</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ex: Bombeiro, médico, enfermeiro"
                    className="shadow-black shadow-md text-gray-600"
                    type="text"
                    {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            }}
          />

          <FormField
            control={form.control}
            name="haveProject"
            render={({ field }) => {
              return (
                <FormItem>
                  <Label htmlFor="projeto">Projeto</Label>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="shadow-black shadow-md text-gray-500">
                        <SelectValue placeholder="Irá para algum projeto?" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Sim">Sim</SelectItem>
                      <SelectItem value="Não">Não</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          {haveProject === "Sim" && (
            <FormField
              control={form.control}
              name="project"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Nome do projeto</FormLabel>
                    <FormControl>
                      <Input
                        className="shadow-black shadow-md text-gray-500"
                        {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          )}

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => {
              return <FormItem>
                <FormLabel>Número de Telefone</FormLabel>
                <FormControl>
                  <Input
                    className="shadow-black shadow-md text-gray-500"
                    placeholder="Telefone com DDD"
                    type="tel"
                    {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            }}
          />

          <FormField
            control={form.control}
            name="emailAddress"
            render={({ field }) => {
              return <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="shadow-black shadow-md text-gray-500"
                    placeholder="Email"
                    type="email"
                    {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            }}
          />

          <Button type="submit" className="w-full h-fit  text-white hover:bg-transparent p-6 border shadow-black shadow-mdr">Enviar</Button>
        </form>
      </Form>
    </div >
  );
}

export default VolunteerForm;