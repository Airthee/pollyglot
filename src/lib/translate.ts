import OpenAI from "openai";

const SYSTEM_PROMPT = `You are an expert translator. You receive the following format : "${formatPrompt('[text]', '[language]')}" and you return only the translated text into the given language.`;

function formatPrompt(text: string, language: string) {
    return `${language} ### ${text}`
}

export async function translate({text, language, apiKey}: {text: string, language: string, apiKey: string}) {
    const openai = new OpenAI({
        dangerouslyAllowBrowser: true,
        apiKey
    });
    const message = formatPrompt(text, language);
    
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: SYSTEM_PROMPT }, {role: 'user', content: message}],
        model: "gpt-4",
    });

    return completion.choices[0].message.content;
}