const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  // apiKey: process.env.OPENAI_API_KEY,
  apiKey: process.argv[2],
});
const openai = new OpenAIApi(configuration);

async function main() {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "I am a highly intelligent question answering bot. If you ask me a question that is rooted in truth, I will give you the answer. If you ask me a question that is nonsense, trickery, or has no clear answer, I will respond with \"Unknown\".\n\nQ: What is human life expectancy in the United States?\nA: Human life expectancy in the United States is 78 years.\n\nQ: Who was president of the United States in 1955?\nA: Dwight D. Eisenhower was president of the United States in 1955.\n\nQ: Which party did he belong to?\nA: He belonged to the Republican Party.\n\nQ: What is the square root of banana?\nA: Unknown\n\nQ: How does a telescope work?\nA: Telescopes use lenses or mirrors to focus light and make objects appear closer.\n\nQ: Where were the 1992 Olympics held?\nA: The 1992 Olympics were held in Barcelona, Spain.\n\nQ: How many squigs are in a bonk?\nA: Unknown\n\nQ: \nA: Unknown\n\nQ: 什么是公司\n\nA: 公司是一种经济组织，它以营利为目的，由股东投资资本，由经理管理，并以其名义从事商业活\n\nQ: 羊绒大姨是谁\nA: Unknown\n\nQ: 写一个快排 一个快速排序的算法如下：",
    temperature: 0,
    max_tokens: 100,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop: ["\n"],
  });

  console.log('response', response)
}

main()