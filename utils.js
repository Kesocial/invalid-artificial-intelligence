import 'dotenv/config';
import { readdir } from 'fs/promises';

// Simple method that returns a random emoji from list
export function getRandomEmoji() {
  const emojiList = ['😭','😄','😌','🤓','😎','😤','🤖','😶‍🌫️','🌏','📸','💿','👋','🌊','✨'];
  return emojiList[Math.floor(Math.random() * emojiList.length)];
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export async function readDirectory(path,cb) {
  try {
    const files = await readdir(path);
    console.log(files);
    if(!cb)cb()
  } catch (err) {
    console.error(err);
  }
}

