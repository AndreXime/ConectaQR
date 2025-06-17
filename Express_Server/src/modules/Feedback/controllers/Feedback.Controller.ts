import FeedbackService from '../services/Feedback.Service.js';
import { validateCreateFeedback } from '../dto/CreateFeedbackDTO.js';

export default class FeedbackController {
	private FeedbackService = new FeedbackService();

	public POST = async (req: ExRequest, res: ExResponse) => {
		const data = validateCreateFeedback(req.body);
		await this.FeedbackService.CreateFeedback(data);
		res.status(200).json({ message: 'Feedback enviado com sucesso' });
	};

	public GET = async (req: ExRequest, res: ExResponse) => {
		if (req.query.senha !== process.env.ADMIN_KEY) {
			res.status(400).json({ message: 'Senha incorreta' });
			return;
		}

		const { Feedbacks, Logs } = await this.FeedbackService.GetFeedback();
		res.status(200).json({ Feedbacks, Logs });
	};
}
