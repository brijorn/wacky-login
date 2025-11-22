type Riddle = {
  id: number;
  question: string;
  answer: string;
};

const riddles: Riddle[] = [
  {
    id: 1,
    question: "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?",
    answer: "Echo"
  },
  {
    id: 2,
    question: "The more of this there is, the less you see. What is it?",
    answer: "Darkness"
  },
  {
    id: 3,
    question: "I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?",
    answer: "Map"
  },
  {
    id: 4,
    question: "I have keys but no locks. I have a space but no room. You can enter, but never go outside. What am I?",
    answer: "Keyboard"
  },
  {
    id: 5,
    question: "I’m tall when I’m young, and I’m short when I’m old. What am I?",
    answer: "Candle"
  },
  {
    id: 6,
    question: "What has hands, but cannot clap?",
    answer: "Clock"
  },
  {
    id: 7,
    question: "What has a neck but no head?",
    answer: "Bottle"
  },
  {
    id: 8,
    question: "What gets wet while drying?",
    answer: "Towel"
  },
  {
    id: 9,
    question: "I have a bed but I never sleep. I have a mouth but never speak. What am I?",
    answer: "River"
  },
  {
    id: 10,
    question: "What has to be broken before you can use it?",
    answer: "Egg"
  }
];

// Get random element from Riddles
export default function getRiddle() {
    return riddles[Math.floor(Math.random() * 10)]
}