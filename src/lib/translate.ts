import axios from 'axios';

type TranslateResponseBody = {
	success: boolean;
	result?: string;
	error?: string;
};

export async function translate({
	text,
	language
}: {
	text: string;
	language: string;
	apiKey: string;
}) {
	const { data } = await axios.post<TranslateResponseBody>('https://openai-worker-453486414663.europe-west9.run.app', {
		text,
		language
	});

	return data.result;
}
