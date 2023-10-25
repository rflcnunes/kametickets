export class ApiResponse {
  constructor(
    public success: boolean,
    public status: number,
    public text?: string,
    public data?: any,
  ) {}
}
