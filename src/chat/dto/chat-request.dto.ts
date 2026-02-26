import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class ChatRequestDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(4096)
  message: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  system?: string;

  @IsOptional()
  @IsString()
  sessionId?: string;
}
