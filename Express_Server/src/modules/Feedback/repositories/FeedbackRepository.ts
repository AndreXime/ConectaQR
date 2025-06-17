import DatabaseModels from '../../../config/Database.js';
import { CreateFeedbackDTO } from '../dto/CreateFeedbackDTO.js';

export default class FeedbackRepository {
	private Feedback = DatabaseModels.feedback;

	public async Create(data: CreateFeedbackDTO) {
		return await this.Feedback.create({ data });
	}

	public async FindAll() {
		return await this.Feedback.findMany();
	}
}
