export class CreateJobDto {
  public title: string;
  public location: string;
  public description: string;
  public category: string;
  public price: number;
  public image: [string];
  public user: string;
}
