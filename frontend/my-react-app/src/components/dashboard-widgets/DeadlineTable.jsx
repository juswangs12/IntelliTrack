import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Plus, Edit, Trash2 } from "lucide-react";

export function DeadlineTable({ deadlines = [], onAdd, onEdit, onDelete }) {
  return (
    <Card className="border-2 border-[#800020]/20">
      <CardHeader className="bg-gradient-to-r from-[#800020] to-[#9B1B30] text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Deadline Management</CardTitle>
            <CardDescription className="text-[#FFD700]">
              Configure project milestones and deadlines
            </CardDescription>
          </div>
          {onAdd && (
            <Button
              className="bg-[#FFD700] hover:bg-[#CCAC00] text-[#800020]"
              onClick={onAdd}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Deadline
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deadlines.map((deadline) => (
              <TableRow key={deadline.id}>
                <TableCell className="font-medium">{deadline.title}</TableCell>
                <TableCell>
                  {new Date(deadline.date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{deadline.category}</Badge>
                </TableCell>
                <TableCell>{deadline.description}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {onEdit && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(deadline)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    )}
                    {onDelete && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDelete(deadline)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
