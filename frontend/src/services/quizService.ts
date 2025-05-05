import axios from "axios";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

interface GetAllQuizzesParams {
  title?: string;
  tags?: string[];
  skip?: number;
  limit?: number;
}

type QuizFormData = {
  title: string;
  description: string;
  questions: Question[];
};

type AnswerRecord = {
  [questionId: number]: {
    type: "text" | "single" | "multiple";
    value: string | number | number[];
  };
};

type Question = {
  title: string;
  points: number;
  is_multiple: boolean;
  is_text: boolean;
  answers: Answer[];
};

type Answer = {
  text: string;
  is_correct: boolean;
};

class quizService {
  async getAllQuizzes(params: GetAllQuizzesParams = {}) {
    try {
      const { title, tags, skip, limit } = params;
      const queryParams = new URLSearchParams();

      if (title) {
        queryParams.append("title", title);
      }

      if (tags && tags.length > 0) {
        tags.forEach((tag) => queryParams.append("tags", tag));
      }

      if (skip !== undefined) {
        queryParams.append("skip", skip.toString());
      }

      if (limit !== undefined) {
        queryParams.append("limit", limit.toString());
      }

      const urlWithParams = `${apiUrl}/quizzes/?${queryParams.toString()}`;
      const response = await axios.get(urlWithParams);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getQuizByID(id: number) {
    try {
      const response = axios.get(apiUrl + "/quizzes/" + id);
      return response;
    } catch (error) {
      throw error;
    }
  }
  async getUserQuizzes() {
    try {
      const response = await axios.get(`${apiUrl}/quizzes/my-quizzes`);
      console.log(response.data);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async createQuiz(data: QuizFormData) {
    try {
      const response = axios.post(apiUrl + "/quizzes/create", data);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async submitAnswers(data: AnswerRecord, id: number) {
    try {
      console.log(data);
      const response = axios.post(apiUrl + "/quizzes/" + id + "/submit", data);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

const QuizService = new quizService();
export default QuizService;
