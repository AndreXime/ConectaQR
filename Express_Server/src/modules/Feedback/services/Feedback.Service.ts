import FeedbackRepository from '../repositories/FeedbackRepository.js';
import { CreateFeedbackDTO } from '../dto/CreateFeedbackDTO.js';
import path from 'path';
import fs from 'fs';

export default class FeedbackService {
	private FeedbackRepository = new FeedbackRepository();
	private LOGS_PATH = path.resolve('logs');

	public CreateFeedback = async (data: CreateFeedbackDTO) => {
		this.FeedbackRepository.Create(data);
	};

	public GetFeedback = async () => {
		const Feedbacks = await this.FeedbackRepository.FindAll();
		const Logs = this.getAllLogs();

		return { Feedbacks, Logs };
	};

	private getAllLogs = (): LogEntry[] => {
		try {
			if (!fs.existsSync(this.LOGS_PATH)) return [];

			const files = fs.readdirSync(this.LOGS_PATH);

			const logs: LogEntry[] = [];

			for (const file of files) {
				const filePath = path.join(this.LOGS_PATH, file);

				if (fs.statSync(filePath).isFile()) {
					const fileContent = fs.readFileSync(filePath, 'utf-8');
					const parsedLogs = this.parseLogToJson(fileContent);
					logs.push(...parsedLogs);
				}
			}
			return logs.reverse();
		} catch {
			return [];
		}
	};

	// ✅ Parseando JSON por linha
	private parseLogToJson = (logData: string): LogEntry[] => {
		return logData
			.trim()
			.split('\n')
			.map((line) => {
				try {
					return JSON.parse(line) as LogEntry;
				} catch {
					return null;
				}
			})
			.filter((entry): entry is LogEntry => entry !== null);
	};
}

interface LogEntry {
	date: string;
	method: string;
	url: string;
	status: number;
	ip: string;
	duration: number;
}
