
import { Mode, Task, WorkoutCategory } from './types';

export const MODE_DETAILS: Record<Mode, { name: string }> = {
  [Mode.NORMAL]: { name: '通常モード' },
  [Mode.MONK]: { name: 'モンクモード' },
  [Mode.BULK_UP]: { name: 'バルクアップモード' },
  [Mode.CUTTING]: { name: '減量期モード' },
};

export const ALL_TASKS: Task[] = [
  // Original tasks, with Mode.NORMAL removed
  { id: 1, title: 'Cold Shower', description: 'Start the day with a 5-minute cold shower to build discipline.', priority: 1, modes: [Mode.MONK, Mode.BULK_UP, Mode.CUTTING], category: 'exercise', subCategory: 'strength' },
  { id: 2, title: 'Meditation', description: '10 minutes of mindfulness meditation to clear your head.', priority: 2, modes: [Mode.MONK], category: 'routine' },
  { id: 3, title: 'Journaling', description: 'Write down your thoughts, goals, and reflections for 15 minutes.', priority: 3, modes: [Mode.MONK], category: 'routine' },
  { id: 4, title: 'High-Intensity Workout', description: 'Complete a 30-minute HIIT session.', priority: 5, modes: [Mode.CUTTING], category: 'exercise', subCategory: 'strength' },
  { id: 5, title: 'Read 20 Pages', description: 'Read 20 pages of a non-fiction book.', priority: 8, modes: [Mode.MONK, Mode.BULK_UP], category: 'routine' },
  { id: 6, title: 'No Social Media', description: 'Abstain from all social media for the entire day.', priority: 4, modes: [Mode.MONK], category: 'routine' },
  { id: 7, title: 'Deep Work Block', description: 'Dedicate 90 minutes of uninterrupted, focused work on your most important task.', priority: 6, modes: [Mode.MONK, Mode.BULK_UP, Mode.CUTTING], category: 'routine' },
  { id: 8, title: 'Lift Heavy Weights', description: 'Perform a strength training session focusing on compound lifts.', priority: 5, modes: [Mode.BULK_UP], category: 'exercise', subCategory: 'strength' },
  { id: 9, title: 'Eat 1g/lb Protein', description: 'Consume at least 1 gram of protein per pound of body weight.', priority: 7, modes: [Mode.BULK_UP, Mode.CUTTING], category: 'meal' },
  { id: 10, title: 'Walk 10,000 Steps', description: 'Reach a goal of 10,000 steps throughout the day.', priority: 9, modes: [Mode.CUTTING], category: 'exercise', subCategory: 'cardio' },
  { id: 11, title: 'Plan Tomorrow', description: 'Before bed, plan your tasks for the next day.', priority: 10, modes: [Mode.MONK, Mode.BULK_UP, Mode.CUTTING], category: 'routine' },
  { id: 12, title: 'Caloric Surplus', description: 'Consume more calories than you burn to build muscle.', priority: 7, modes: [Mode.BULK_UP], category: 'meal' },
  { id: 13, 'title': 'Caloric Deficit', 'description': 'Consume fewer calories than you burn to lose fat.', priority: 7, modes: [Mode.CUTTING], category: 'meal' },
  { id: 14, title: 'Fasting Period', description: 'Complete an 18-hour fast.', priority: 4, modes: [Mode.MONK, Mode.CUTTING], category: 'meal' },
  { id: 15, title: 'Drink 3L of Water', description: 'Stay hydrated by drinking at least 3 liters of water.', priority: 1, modes: [Mode.MONK, Mode.BULK_UP, Mode.CUTTING], category: 'meal' },

  // NORMAL mode - Morning tasks
  { id: 16, title: '起床', subtitle: 'アラームが鳴ったら1秒で起きろ。スヌーズ押す男は信用できない。', description: '朝起きてすぐに水を飲め。お前はこれから戦いに出るんだ。', priority: 1, modes: [Mode.NORMAL], category: 'routine', subCategory: 'morning'},
  { id: 17, title: '光合成', subtitle: 'カーテンを開けて、日光を浴びろ。', description: '光合成は植物だけのもんじゃない。人間にもある。', priority: 2, modes: [Mode.NORMAL], category: 'routine', subCategory: 'morning'},
  { id: 18, title: 'ベッドメイキング', subtitle: 'ベッドを整えろ。', description: 'ベッドの乱れは心の乱れだ。', priority: 3, modes: [Mode.NORMAL], category: 'routine', subCategory: 'morning'},
  { id: 19, title: '電解質ドリンク', subtitle: '朝一はミネラルが不足してる。', description: 'ヒマレイアンピンクソルトを水に溶かして飲め。これは魔法の一杯だ。\n体はミネラルをスポンジのように吸収し一瞬で活性化する。', priority: 4, modes: [Mode.NORMAL], category: 'routine', subCategory: 'morning'},
  { id: 20, title: '身支度', subtitle: 'ハイレベルな男はヘアセットを欠かさない。\nそれは髪がなくても、だ。', description: 'お前、トイレふざけんな。覗くな！なんで覗いてんだよ！\nそのハンサムな顔を今すぐ保湿しろ。', priority: 5, modes: [Mode.NORMAL], category: 'routine', subCategory: 'morning'},
  { id: 21, title: '瞑想', subtitle: '心を無にして、10分間瞑想しろ。', description: 'お前の内なる声を聞け。', priority: 6, modes: [Mode.NORMAL], category: 'routine', subCategory: 'morning'},
  { id: 22, title: 'ジャーナル', subtitle: '小さな工夫が大きな違いを作る。\n本物の男は朝に作られる。', description: '今日の任務を書き出して遂行しろ。\nいつまでもこんなクソ動画見てるな。', priority: 7, modes: [Mode.NORMAL], category: 'routine', subCategory: 'morning'},
  { id: 23, title: '掃除', subtitle: '掃除機かけろ。', description: 'いつ女の子を呼んでも恥ずかしくない部屋を保つ、\nそれがハイレベルな男だ。', priority: 8, modes: [Mode.NORMAL], category: 'routine', subCategory: 'morning'},
  { id: 24, title: 'リップケア', subtitle: 'かとゆりがお前を狙ってる。', description: '今すぐ唇を潤しておけ。', priority: 9, modes: [Mode.NORMAL], category: 'routine', subCategory: 'morning'},

  // NORMAL mode - Night tasks
  { id: 25, title: 'シャワー', subtitle: 'ナチュラル素材のものを使え。', description: 'ちなみにこれ女の子にギフト何かあるか迷ったらとりあえずイソップのメーカーの何か買っとけば間違いない。', priority: 100, modes: [Mode.NORMAL], category: 'routine', subCategory: 'night'},
  { id: 26, title: '部屋中の電気を消す。', subtitle: '上からの光を浴びると体が昼だと勘違いするぞ。', description: '暖色系の照明はokだ。アンドリュー・ヒューバマンを信じろ。', priority: 101, modes: [Mode.NORMAL], category: 'routine', subCategory: 'night'},
  { id: 27, title: 'カモミールティーorホットミルクはちみつ入り', subtitle: 'ノンカフェインだ。', description: '飲みながらみんな大好きなアレをやっていくぞ。', priority: 102, modes: [Mode.NORMAL], category: 'routine', subCategory: 'night'},
  { id: 28, title: 'ジャーナル', subtitle: 'ジャーナルですよ。', description: '内容：\n1日の振り返り\n感じたこと、悩み、それへの対策\n明日の予定やアイデア\n「うんこがでかかった。」', priority: 103, modes: [Mode.NORMAL], category: 'routine', subCategory: 'night'},
  { id: 29, title: 'オーディオブックor読書', subtitle: '基本的にスマホを見るな。', description: '「金持ち父さん貧乏父さん」\nポッドキャスト（アンドリュー・ヒューバーマン、ポール・サラディノ）\nはもうチェックしたか？', priority: 104, modes: [Mode.NORMAL], category: 'routine', subCategory: 'night'},
  { id: 30, title: 'ベッド', subtitle: 'ベッドはチョメチョメ以外は睡眠の場所だ。', description: 'エアコンを低めに設定して毛布を被れ。\n週に4～6回は最高の睡眠をとれ。', priority: 105, modes: [Mode.NORMAL], category: 'routine', subCategory: 'night'},
];

export interface ExerciseInfo {
  name: string;
  jp_name: string;
  category: WorkoutCategory;
}

export const WORKOUT_CATEGORIES: { id: WorkoutCategory; name: string }[] = [
    { id: 'push', name: 'Push (押す)' },
    { id: 'pull', name: 'Pull (引く)' },
    { id: 'leg', name: 'Leg (脚)' },
];

export const WORKOUT_EXERCISES: ExerciseInfo[] = [
  // Push
  { name: 'Bench Press', jp_name: 'ベンチプレス', category: 'push' },
  { name: 'Overhead Press', jp_name: 'オーバーヘッドプレス', category: 'push' },
  { name: 'Incline Dumbbell Press', jp_name: 'インクラインダンベルプレス', category: 'push' },
  { name: 'Dips', jp_name: 'ディップス', category: 'push' },
  { name: 'Push-ups', jp_name: '腕立て伏せ', category: 'push' },
  { name: 'Tricep Pushdowns', jp_name: 'トライセププッシュダウン', category: 'push' },
  { name: 'Side Lateral Raise', jp_name: 'サイドレイズ', category: 'push' },

  // Pull
  { name: 'Pull-ups', jp_name: '懸垂', category: 'pull' },
  { name: 'Chin-ups', jp_name: 'チンアップ', category: 'pull' },
  { name: 'Barbell Row', jp_name: 'バーベルロウ', category: 'pull' },
  { name: 'Dumbbell Row', jp_name: 'ダンベルロウ', category: 'pull' },
  { name: 'Lat Pulldown', jp_name: 'ラットプルダウン', category: 'pull' },
  { name: 'Face Pulls', jp_name: 'フェイスプル', category: 'pull' },
  { name: 'Bicep Curls', jp_name: 'バイセップスカール', category: 'pull' },

  // Leg
  { name: 'Squat', jp_name: 'スクワット', category: 'leg' },
  { name: 'Deadlift', jp_name: 'デッドリフト', category: 'leg' },
  { name: 'Leg Press', jp_name: 'レッグプレス', category: 'leg' },
  { name: 'Lunges', jp_name: 'ランジ', category: 'leg' },
  { name: 'Calf Raises', jp_name: 'カーフレイズ', category: 'leg' },
  { name: 'Hamstring Curls', jp_name: 'ハムストリングカール', category: 'leg' },
  { name: 'Leg Extensions', jp_name: 'レッグエクステンション', category: 'leg' },
];
