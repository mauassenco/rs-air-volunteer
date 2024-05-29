import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../_components/ui/table";



const VolunteerFormPage = () => {
  return (
    <div className="bg-slate-600 h-screen">
      <div className="flex flex-col items-center justify-between pt-24">
        <h1 className="font-bold text-white text-3xl py-8">Listagem de Voos</h1>
      </div>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="border rounded p-2">
          <Table>
            <TableHeader className="text-center">
              <TableHead>Origem</TableHead>
              <TableHead>Destino</TableHead>
              <TableHead>Vagas Disponíveis</TableHead>
              <TableHead>Dia</TableHead>
              <TableHead>Hora da Partida</TableHead>
              <TableHead>Hora da Chegada</TableHead>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 9 }).map((_, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell>São Paulo</TableCell>
                    <TableCell>Porto Alegre</TableCell>
                    <TableCell className="text-center">3</TableCell>
                    <TableCell>13/06/2024</TableCell>
                    <TableCell>10:00</TableCell>
                    <TableCell>14:00</TableCell>
                  </TableRow>
                )
              })}

            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default VolunteerFormPage;