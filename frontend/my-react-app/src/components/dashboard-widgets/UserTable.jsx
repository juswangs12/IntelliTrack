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

export function UserTable({ users = [], onAdd, onEdit, onDelete }) {
  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "Admin":
        return "bg-[#800020] text-white";
      case "Adviser":
        return "bg-[#FFD700] text-[#800020]";
      case "Student":
        return "bg-blue-100 text-blue-800 border-blue-300";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="border-2 border-[#800020]/20">
      <CardHeader className="bg-gradient-to-r from-[#800020] to-[#9B1B30] text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>User Management</CardTitle>
            <CardDescription className="text-[#FFD700]">
              Manage system users and assign roles
            </CardDescription>
          </div>
          {onAdd && (
            <Button
              className="bg-[#FFD700] hover:bg-[#CCAC00] text-[#800020]"
              onClick={onAdd}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Group</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge className={getRoleBadgeColor(user.role)}>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>{user.group || "-"}</TableCell>
                <TableCell>
                  <Badge
                    variant={user.status === "Active" ? "default" : "secondary"}
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {onEdit && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(user)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    )}
                    {onDelete && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDelete(user)}
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
