"use client"
import React from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Chip,
} from "@nextui-org/react";
import {companyJob} from "@/types/company.types";
import {Edit, Eye, Loader2, Trash} from "lucide-react";
import Link from "next/link";
import {useAction} from "next-safe-action/hooks";
import {deleteJob} from "@/actions/job.actions";

const JobsTable = ({jobs}: { jobs: companyJob[] }) => {
    const {execute,status}= useAction(deleteJob)
    return (
        <>
            <Table className="w-full" aria-label="Example table with custom cells">
                <TableHeader>
                    <TableColumn align="start">Title</TableColumn>
                    <TableColumn align="start">Status</TableColumn>
                    <TableColumn align="start">Applications</TableColumn>
                    <TableColumn align="center">Actions</TableColumn>
                </TableHeader>
                <TableBody items={jobs.sort((a,b)=>+b.createdAt - +a.createdAt)} emptyContent={<div className="text-lg font-semibold">There is no jobs!</div>}>
                    {(item) => (
                        <TableRow key={item._id}>
                            <TableCell align="left">
                                {item.title}
                            </TableCell>
                            <TableCell align="left">
                                <Chip size="sm" color={item.status === "active" ? "success" : "danger"}>{item.status}</Chip>
                            </TableCell>
                            <TableCell align="right">
                                <Link href={`/home/applications/job/${item._id}`} className="hover:underline">
                                    {item.applications.length}
                                </Link>
                            </TableCell>
                            <TableCell className="space-x-3 flex">
                                    <Link href={`/home/jobs/edit/${item._id}`}>
                                        <Edit size={18} className="text-blue-500"/>
                                    </Link>
                                    <Link href={`/home/jobs/${item._id}`}>
                                        <Eye size={20} className="text-yellow-500"/>
                                    </Link>
                                    <button className="text-red-500" onClick={()=>execute({id:item._id})}>
                                        {status === "executing" ? <Loader2 size={18} className="animate-spin"/> :<Trash size={19}/>}
                                    </button>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    );
}
export default JobsTable