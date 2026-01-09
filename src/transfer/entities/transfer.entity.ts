export class Transfer {
    id: string;
    transfer_company_id: string;
    transfer_amount: number;
    transfer_date: Date;
    transfer_status: string;
    transfer_type: string;
    transfer_description: string;
    transfer_create_at?: Date;
    transfer_update_at?: Date;
    transfer_is_active?: boolean;
}
