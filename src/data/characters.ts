export interface Character {
  id: string;
  name: string;
  title: string;
  emoji: string;
  dimension: string;
  status: "available" | "busy" | "parallel-universe";
}

export const CHARACTERS: Character[] = [
  { id: "einstein", name: "Albert Einstein", title: "Theoretical Physicist", emoji: "🧠", dimension: "Dimension-E=MC²", status: "available" },
  { id: "hawking", name: "Stephen Hawking", title: "Cosmologist", emoji: "🌌", dimension: "Black Hole Nexus", status: "available" },
  { id: "jadoo", name: "Jadoo", title: "Alien Friend", emoji: "👽", dimension: "Koi Mil Gaya Verse", status: "available" },
  { id: "chotabheem", name: "Chota Bheem", title: "Warrior of Dholakpur", emoji: "💪", dimension: "Dholakpur Prime", status: "available" },
  { id: "thanos", name: "Thanos", title: "The Mad Titan", emoji: "🟣", dimension: "Titan-616", status: "available" },
  { id: "gandhi", name: "Mahatma Gandhi", title: "Father of the Nation", emoji: "🕊️", dimension: "Peace Dimension", status: "available" },
  { id: "elonmusk", name: "Elon Musk", title: "Mars Colony CEO", emoji: "🚀", dimension: "Mars-X Colony", status: "available" },
  { id: "sherlock", name: "Sherlock Holmes", title: "Consulting Detective", emoji: "🔍", dimension: "221B-Baker Verse", status: "available" },
  { id: "yoda", name: "Master Yoda", title: "Jedi Grand Master", emoji: "🟢", dimension: "Force Nexus-900", status: "available" },
  { id: "tesla", name: "Nikola Tesla", title: "Electrical Genius", emoji: "⚡", dimension: "AC Current Realm", status: "available" },
  { id: "doraemon", name: "Doraemon", title: "Robot Cat from Future", emoji: "🐱", dimension: "22nd Century Tokyo", status: "available" },
  { id: "ironman", name: "Tony Stark", title: "Iron Man", emoji: "🦾", dimension: "Avengers-199999", status: "available" },
];
