export interface FindAllOptionsDto {
    query?: string;
    orderBy?: "created_at" | "updated_at";
    order?: "ASC" | "DESC";
    limit?: number;
}
