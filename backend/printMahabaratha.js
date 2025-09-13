// printMahabharatha.js
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ---------------- MongoDB connection ----------------
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/Mahabharatha';
mongoose.connect(MONGO_URI)
  .then(() => console.log(`✅ MongoDB connected at ${MONGO_URI}`))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

// ---------------- Schema & Model ----------------
const entrySchema = new mongoose.Schema({
  Book_id: String,
  Chapter_id: String,
  Verse_id: String,
  Content_eng: String,
  Content_hin: String,
  Content_chi: String,
  Summary: String
}, { collection: 'Mahabharatha', versionKey: false });

// Optional: prevent exact-duplicate triplets (comment out if you don't want uniqueness)
entrySchema.index({ Book_id: 1, Chapter_id: 1, Verse_id: 1 }, { unique: true });

const Entry = mongoose.model('Entry', entrySchema);

// ---------------- PASTE YOUR 100 ENTRIES BELOW ----------------
// ⚠️ Paste EXACTLY what you provided previously, even if it's an array-of-array.
// Example shape accepted:
//   [ {..}, {..}, ... ]    OR    [ [ {..}, {..}, ... ] ]
//
// Replace EVERYTHING between the two markers with your full JSON.
// ---------------- BEGIN_RAW_DATA ----------------
const RAW_DATA = [
        [
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "1",
            "Content_eng": "Om! Having bowed down to Narayana and Nara, the most exalted male being, and also to the goddess Saraswati, must the word Jaya be uttered.",
            "Content_hin": "ॐ! नारायण और नर, उन श्रेष्ठ पुरुषों, और देवी सरस्वती को प्रणाम करके 'जय' शब्द का उच्चारण करना चाहिए।",
            "Content_chi": "唵！向至高的神祇那罗延与圣人那罗，以及女神萨拉斯瓦蒂致敬，然后应当诵念‘胜利’（Jaya）之语。",
            "Summary": "The Mahabharata begins with an invocation to the divine beings Narayana, Nara, and Saraswati, before the story of 'Jaya' is told."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "2",
            "Content_eng": "Ugrasrava Sauti, the son of Lomaharshana, well-versed in the Puranas, recited the Mahabharata to the sages in the forest of Naimisha.",
            "Content_hin": "उग्रश्रवाः सौति, जो लोमहर्षण के पुत्र और पुराणों के ज्ञाता थे, नैमिषारण्य के ऋषियों को महाभारत सुनाते हैं।",
            "Content_chi": "乌格拉什拉瓦·索提，罗摩哈尔沙纳之子，精通往世书，于奈密沙林中向众圣贤讲述摩诃婆罗多。",
            "Summary": "Sauti, son of Lomaharshana, begins narrating the Mahabharata to the sages in the Naimisha forest."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "3",
            "Content_eng": "The sages had assembled during a great sacrifice and were eager to hear ancient stories that impart wisdom and virtue.",
            "Content_hin": "महायज्ञ के समय ऋषि एकत्र हुए थे और वे प्राचीन ज्ञानवर्धक और धर्म की कहानियाँ सुनने के इच्छुक थे।",
            "Content_chi": "众贤在盛大祭祀期间齐聚，他们渴望聆听蕴含智慧与德行的古老传说。",
            "Summary": "The sages, gathered at a great sacrifice, expressed their desire to hear ancient stories of wisdom and righteousness."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "4",
            "Content_eng": "Sauti paid respects to the great sages and offered to narrate the great epic composed by Vyasa, called the Mahabharata.",
            "Content_hin": "सौति ने महान ऋषियों को प्रणाम किया और व्यास द्वारा रचित महाकाव्य 'महाभारत' सुनाने का प्रस्ताव रखा।",
            "Content_chi": "索提向伟大的圣贤致敬，并提议讲述由毗耶娑创作的伟大史诗——摩诃婆罗多。",
            "Summary": "Sauti honors the sages and proposes to recite Vyasa’s great epic, the Mahabharata."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "5",
            "Content_eng": "This great epic, consisting of one hundred thousand verses, is the essence of all scriptures and conveys profound truths.",
            "Content_hin": "यह महान महाकाव्य, जो एक लाख श्लोकों का है, सभी शास्त्रों का सार है और गहरे सत्य प्रकट करता है।",
            "Content_chi": "这部伟大的史诗共十万偈颂，是一切经典的精华，传达深邃的真理。",
            "Summary": "The Mahabharata, with 100,000 verses, is the distilled wisdom of the scriptures and conveys deep philosophical truths."
        },

        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "6",
            "Content_eng": "It is said that whoever reads or hears this epic with devotion will attain virtue, wealth, desire, and liberation.",
            "Content_hin": "कहा गया है कि जो कोई भी भक्ति भाव से इस महाकाव्य को पढ़ता या सुनता है, वह धर्म, अर्थ, काम और मोक्ष को प्राप्त करता है।",
            "Content_chi": "据说，凡虔诚诵读或聆听此史诗者，皆可获得法（德）、财（富）、欲（愿）与解脱（涅槃）。",
            "Summary": "The Mahabharata is believed to grant the four aims of life to those who read or hear it with devotion."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "7",
            "Content_eng": "Sauti described how Vyasa composed the Mahabharata and taught it to his disciple Vaishampayana.",
            "Content_hin": "सौति ने बताया कि कैसे व्यास ने महाभारत की रचना की और अपने शिष्य वैशंपायन को यह सिखाया।",
            "Content_chi": "索提叙述毗耶娑如何创作摩诃婆罗多，并将其传授给弟子卫舍波阉那。",
            "Summary": "Sauti explains that Vyasa composed the Mahabharata and taught it to his disciple Vaishampayana."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "8",
            "Content_eng": "At the great snake sacrifice of King Janamejaya, Vaishampayana narrated the Mahabharata to the assembled sages.",
            "Content_hin": "राजा जनमेजय के नाग यज्ञ में, वैशंपायन ने एकत्र ऋषियों को महाभारत का वर्णन किया।",
            "Content_chi": "在国王阎米阇耶举行的大蛇祭中，卫舍波阉那向集会的圣贤们讲述了摩诃婆罗多。",
            "Summary": "Vaishampayana recited the Mahabharata during King Janamejaya’s great snake sacrifice."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "9",
            "Content_eng": "Sauti heard this narration from Vaishampayana and resolved to share it with the sages at Naimisha forest.",
            "Content_hin": "सौति ने वैशंपायन से यह कथा सुनी और नैमिषारण्य के ऋषियों को इसे सुनाने का निश्चय किया।",
            "Content_chi": "索提从卫舍波阉那处听得此传说，并决意向奈密沙林中的圣贤们讲述。",
            "Summary": "Having heard the story from Vaishampayana, Sauti decides to retell it to the sages in the forest."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "10",
            "Content_eng": "Thus begins the tale of the Kurus and Pandavas, filled with heroism, wisdom, and the consequences of destiny.",
            "Content_hin": "इस प्रकार कुरुओं और पांडवों की कथा आरंभ होती है, जो वीरता, ज्ञान और नियति के परिणामों से परिपूर्ण है।",
            "Content_chi": "如此，俱卢与般度族的传说展开，充满英勇、智慧与命运的后果。",
            "Summary": "The epic begins, recounting the tale of the Kuru and Pandava dynasties, rich in valor, knowledge, and fate."
        },

        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "11",
            "Content_eng": "The sages in the forest welcomed Sauti with great respect and asked him to narrate the sacred story.",
            "Content_hin": "वन में उपस्थित ऋषियों ने सौति का आदरपूर्वक स्वागत किया और उनसे पवित्र कथा सुनाने का अनुरोध किया।",
            "Content_chi": "林中的圣贤恭敬地欢迎索提，并请求他讲述神圣的故事。",
            "Summary": "The sages respectfully welcomed Sauti and requested him to narrate the sacred epic."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "12",
            "Content_eng": "They wished to hear about the righteous Kauravas and Pandavas, and the great war that shook the earth.",
            "Content_hin": "उन्होंने धर्मयुक्त कौरवों और पांडवों की कथा तथा उस महान युद्ध की कथा सुनने की इच्छा व्यक्त की जिसने धरती को हिला दिया।",
            "Content_chi": "他们希望听到有关正义的俱卢与般度族以及震撼大地的伟大战争的故事。",
            "Summary": "The sages expressed a desire to hear about the noble Kauravas, Pandavas, and their epic war."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "13",
            "Content_eng": "Sauti bowed before them and spoke of Vyasa’s greatness and how he composed this mighty work.",
            "Content_hin": "सौति ने उन्हें प्रणाम किया और व्यास की महानता तथा उनके द्वारा रचित इस विशाल ग्रंथ का वर्णन किया।",
            "Content_chi": "索提向众圣贤行礼，讲述毗耶娑的伟大以及他如何创作这部宏伟的作品。",
            "Summary": "Sauti honors the sages and begins by praising Vyasa’s genius in composing the epic."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "14",
            "Content_eng": "Vyasa, having witnessed the rise and fall of kings, compiled these events for the benefit of mankind.",
            "Content_hin": "व्यास ने राजाओं के उत्थान और पतन को देखा और मानव कल्याण हेतु इन घटनाओं का संकलन किया।",
            "Content_chi": "毗耶娑目睹国王的兴衰，为人类的利益记录了这些事件。",
            "Summary": "Vyasa composed the Mahabharata to preserve the history and moral lessons of royal deeds."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "15",
            "Content_eng": "It is said that the Mahabharata contains the essence of all scriptures, like butter churned from milk.",
            "Content_hin": "कहा गया है कि महाभारत सभी शास्त्रों का सार है, जैसे दूध से मथ कर निकाला गया मक्खन।",
            "Content_chi": "据说，摩诃婆罗多是所有经典的精华，如同牛奶中提炼出的黄油。",
            "Summary": "The Mahabharata is described as the distilled wisdom of all scriptures."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "16",
            "Content_eng": "Sauti told the sages that Vyasa taught this epic to his disciple Vaishampayana, who shared it at a royal sacrifice.",
            "Content_hin": "सौति ने ऋषियों को बताया कि व्यास ने इस महाकाव्य को अपने शिष्य वैशंपायन को सिखाया, जिन्होंने इसे एक राजसूय यज्ञ में सुनाया।",
            "Content_chi": "索提告诉圣贤们，毗耶娑将这部史诗传授给弟子卫舍波阉那，后者在王室祭祀中讲述了它。",
            "Summary": "Sauti recounts how Vyasa passed on the epic to Vaishampayana, who then shared it at a royal event."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "17",
            "Content_eng": "King Janamejaya, son of Parikshit, was performing a sacrifice to avenge his father's death by a serpent.",
            "Content_hin": "राजा जनमेजय, जो परीक्षित के पुत्र थे, अपने पिता की सर्प द्वारा हुई मृत्यु का प्रतिशोध लेने हेतु यज्ञ कर रहे थे।",
            "Content_chi": "阎米阇耶王，为复仇其父帕里克希特被蛇咬之死，举行了祭祀仪式。",
            "Summary": "King Janamejaya held a snake sacrifice to avenge his father’s death by serpent bite."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "18",
            "Content_eng": "It was there, during this grand sacrifice, that Vaishampayana narrated the entire Mahabharata to the gathered audience.",
            "Content_hin": "वहीं, उस भव्य यज्ञ में, वैशंपायन ने समस्त महाभारत कथा उपस्थित जनसमूह को सुनाई।",
            "Content_chi": "正是在这场盛大的祭祀中，卫舍波阉那向在场众人讲述了完整的摩诃婆罗多。",
            "Summary": "Vaishampayana recited the full Mahabharata at the grand snake sacrifice."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "19",
            "Content_eng": "The tale includes the lives of kings, sages, celestial beings, and demons—all woven into one grand narrative.",
            "Content_hin": "इस कथा में राजाओं, ऋषियों, देवताओं और असुरों के जीवन की घटनाएँ एक विशाल कथा में बुनी गई हैं।",
            "Content_chi": "这部史诗融合了国王、圣贤、神灵与恶魔的故事，构成一个宏大的叙事。",
            "Summary": "The epic covers a wide range of characters—human and divine—within a single grand story."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "20",
            "Content_eng": "O sages, said Sauti, listen with a pure heart, and I shall now recount this tale of dharma, fate, and war.",
            "Content_hin": "सौति ने कहा, हे ऋषियों! शुद्ध हृदय से सुनिए, अब मैं धर्म, भाग्य और युद्ध की यह कथा सुनाता हूँ।",
            "Content_chi": "索提说道：“哦圣贤们，以清净之心聆听，我将讲述这部关于法、命运与战争的史诗。”",
            "Summary": "Sauti urges the sages to listen with devotion as he begins the tale of dharma and destiny."
        },

        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "21",
            "Content_eng": "This story, O sages, is not only ancient but also eternal, teaching the values of dharma through every generation.",
            "Content_hin": "हे ऋषियों, यह कथा प्राचीन ही नहीं, बल्कि शाश्वत है, जो प्रत्येक पीढ़ी को धर्म का पाठ पढ़ाती है।",
            "Content_chi": "哦圣贤们，此故事不仅古老而且永恒，代代传授着法的价值。",
            "Summary": "Sauti describes the Mahabharata as an eternal story that teaches dharma to all generations."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "22",
            "Content_eng": "Many wise souls have found peace, knowledge, and liberation by contemplating its teachings.",
            "Content_hin": "अनेकों ज्ञानी आत्माएँ इसकी शिक्षाओं का मनन करके शांति, ज्ञान और मोक्ष को प्राप्त कर चुकी हैं।",
            "Content_chi": "众多智者通过沉思其教义而获得安宁、智慧与解脱。",
            "Summary": "Sauti notes that reflecting on the epic's teachings has led many to spiritual wisdom and liberation."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "23",
            "Content_eng": "The Mahabharata contains discussions on morality, politics, philosophy, and the duties of kings and citizens alike.",
            "Content_hin": "महाभारत में नैतिकता, राजनीति, दर्शन और राजाओं व नागरिकों के कर्तव्यों पर गहन चर्चा है।",
            "Content_chi": "摩诃婆罗多包含有关道德、政治、哲学及君民职责的深刻讨论。",
            "Summary": "The epic offers insights into ethics, governance, philosophy, and social duties."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "24",
            "Content_eng": "Even the gods and sages listen to its recitation with reverence, for it holds the essence of universal truth.",
            "Content_hin": "देवता और ऋषि भी श्रद्धा से इसकी कथा सुनते हैं, क्योंकि इसमें सार्वभौमिक सत्य का सार है।",
            "Content_chi": "即便神祇与圣贤也虔敬聆听此史诗，其内涵蕴藏宇宙真理之精华。",
            "Summary": "Sauti says even divine beings revere the Mahabharata, recognizing its universal wisdom."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "25",
            "Content_eng": "The story begins with the ancestry of the Bharata race, tracing their lineage and noble deeds.",
            "Content_hin": "यह कथा भरत वंश के पूर्वजों से आरंभ होती है, उनकी वंशावली और महान कर्मों का वर्णन करती है।",
            "Content_chi": "故事从婆罗多族的祖先讲起，追溯其血统与高贵的行为。",
            "Summary": "The epic opens by recounting the ancestry and heritage of the Bharata dynasty."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "26",
            "Content_eng": "It tells of kings who upheld dharma, and others who fell due to pride, anger, or deceit.",
            "Content_hin": "यह उन राजाओं की कथा कहती है जिन्होंने धर्म का पालन किया, और उन लोगों की भी जिन्होंने अहंकार, क्रोध या छल के कारण पतन पाया।",
            "Content_chi": "史诗讲述了遵守法的国王，以及因傲慢、愤怒或欺骗而堕落者的故事。",
            "Summary": "The Mahabharata shows examples of both virtuous rulers and those who succumbed to their flaws."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "27",
            "Content_eng": "Through stories of love, betrayal, valor, and loss, the epic mirrors the struggles of human life.",
            "Content_hin": "प्रेम, विश्वासघात, वीरता और हानि की कथाओं के माध्यम से यह महाकाव्य मानव जीवन के संघर्षों को दर्शाता है।",
            "Content_chi": "通过爱、背叛、勇气与失落的故事，此史诗映射出人类生活的种种挣扎。",
            "Summary": "The Mahabharata reflects the complexities of life through diverse human emotions and experiences."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "28",
            "Content_eng": "In every tale, dharma is tested, and characters must choose between righteousness and personal desire.",
            "Content_hin": "प्रत्येक कथा में धर्म की परीक्षा होती है, और पात्रों को धर्म और स्वार्थ के बीच चुनाव करना होता है।",
            "Content_chi": "在每一个故事中，法都会受到考验，角色们必须在正义与私欲之间抉择。",
            "Summary": "The epic repeatedly explores the tension between moral duty and individual desires."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "29",
            "Content_eng": "Sauti promised to narrate the entire tale as it was told by Vyasa and remembered by the wise.",
            "Content_hin": "सौति ने वचन दिया कि वह पूरी कथा उसी प्रकार सुनाएंगे जैसे व्यास ने कहा और ज्ञानी जनों ने स्मरण किया।",
            "Content_chi": "索提承诺将完整讲述此故事，正如毗耶娑所言，智者所记。",
            "Summary": "Sauti commits to faithfully retelling the epic in the tradition of Vyasa’s original narration."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "30",
            "Content_eng": "Thus, in the sacred forest of Naimisha, the great tale was again brought to life for the benefit of all beings.",
            "Content_hin": "इस प्रकार नैमिषारण्य के पवित्र वन में यह महान कथा सभी प्राणियों के कल्याण हेतु पुनः जीवंत हुई।",
            "Content_chi": "就这样，在神圣的奈密沙林中，此伟大史诗再次为众生的福祉而被讲述。",
            "Summary": "The epic begins anew in Naimisha forest, shared for the enlightenment of all."
        },

        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "31",
            "Content_eng": "The forest echoed with silence as the sages prepared themselves to listen with full attention and reverence.",
            "Content_hin": "वन में मौन छा गया जब ऋषियों ने पूरी श्रद्धा और ध्यान से सुनने की तैयारी की।",
            "Content_chi": "森林中寂静无声，圣贤们准备好以专注与虔诚聆听。",
            "Summary": "The sages became silent and attentive, ready to hear the sacred narrative."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "32",
            "Content_eng": "Sauti took a deep breath and began recounting the wondrous tales filled with dharma and destiny.",
            "Content_hin": "सौति ने गहरी साँस ली और धर्म व भाग्य से परिपूर्ण अद्भुत कथाएँ सुनानी शुरू कीं।",
            "Content_chi": "索提深吸一口气，开始讲述那些充满法与命运的奇妙传说。",
            "Summary": "Sauti begins narrating the epic tales, filled with lessons of dharma and fate."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "33",
            "Content_eng": "He spoke of the beginnings of time, the creation of the world, and the divine lineage of ancient kings.",
            "Content_hin": "उसने समय की शुरुआत, सृष्टि की रचना और प्राचीन राजाओं की दिव्य वंशावली का वर्णन किया।",
            "Content_chi": "他讲述了时间的起源、世界的创造以及古王的神圣血统。",
            "Summary": "The narration starts with cosmic origins and the divine lineage of kings."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "34",
            "Content_eng": "The earth, once burdened by evil, approached the gods for help, and they promised to incarnate in human form.",
            "Content_hin": "जब पृथ्वी पाप से बोझिल हुई, तब उसने देवताओं से सहायता मांगी और उन्होंने मानव रूप में अवतार लेने का वचन दिया।",
            "Content_chi": "大地因罪恶沉重，向诸神求助，神明允诺以人形降世。",
            "Summary": "The gods agree to incarnate on earth to restore balance when evil prevails."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "35",
            "Content_eng": "Thus were born heroes and kings with divine essence, destined to play roles in the great war.",
            "Content_hin": "इस प्रकार देवतुल्य आत्माओं वाले वीर और राजा जन्मे, जो महायुद्ध में अपनी भूमिका निभाने वाले थे।",
            "Content_chi": "于是带有神性之勇士与君王降生，注定在大战中扮演重要角色。",
            "Summary": "Divine souls took birth as warriors and kings to fulfill their roles in the destined conflict."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "36",
            "Content_eng": "Among them were the Pandavas and Kauravas, born into the Kuru dynasty, their fates intertwined.",
            "Content_hin": "उनमें पांडव और कौरव भी थे, जो कुरु वंश में जन्मे थे और जिनके भाग्य एक-दूसरे से जुड़े थे।",
            "Content_chi": "其中包括般度与俱卢族，他们生于俱卢王朝，命运相互交织。",
            "Summary": "The Pandavas and Kauravas are born into the Kuru line, destined to clash in war."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "37",
            "Content_eng": "The throne of Hastinapura became the center of conflict, as envy and pride began to grow.",
            "Content_hin": "हस्तिनापुर का सिंहासन संघर्ष का केंद्र बना, जब ईर्ष्या और अहंकार बढ़ने लगे।",
            "Content_chi": "随着嫉妒与傲慢滋长，哈斯提那普尔王座成为冲突之源。",
            "Summary": "Envy and ambition spark a power struggle for the throne of Hastinapura."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "38",
            "Content_eng": "Despite their shared blood, the two factions grew apart, driven by fate and human weaknesses.",
            "Content_hin": "एक ही रक्त होने के बावजूद, दोनों पक्ष भाग्य और मानवीय दुर्बलताओं के कारण एक-दूसरे से दूर हो गए।",
            "Content_chi": "尽管同根同源，两派因命运与人性弱点渐行渐远。",
            "Summary": "The Kauravas and Pandavas drift apart despite their kinship, led by fate and flaws."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "39",
            "Content_eng": "Wise sages like Bhishma and Vidura tried to maintain peace, but destiny could not be denied.",
            "Content_hin": "भीष्म और विदुर जैसे बुद्धिमान ऋषियों ने शांति बनाए रखने की कोशिश की, परंतु भाग्य को नकारा नहीं जा सका।",
            "Content_chi": "毗湿摩与毗度罗等智者竭力维持和平，然命运不可违。",
            "Summary": "Despite efforts by elders to preserve peace, destiny moves events toward war."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "40",
            "Content_eng": "Thus began the sequence of events that would lead to the greatest war mankind had ever known.",
            "Content_hin": "इस प्रकार घटनाओं की वह श्रृंखला आरंभ हुई जो मानव इतिहास के सबसे महान युद्ध की ओर ले गई।",
            "Content_chi": "于是，一连串事件展开，引向人类史上最伟大的战争。",
            "Summary": "The chain of events that would culminate in the great Kurukshetra war begins."
        },

        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "41",
            "Content_eng": "Kings from across the world gathered for alliances, some driven by dharma, others by ambition.",
            "Content_hin": "दुनिया भर के राजा संधियों के लिए एकत्र हुए, कुछ धर्म से प्रेरित थे, तो कुछ महत्त्वाकांक्षा से।",
            "Content_chi": "来自世界各地的国王聚集结盟，有的出于正义，有的因野心所驱。",
            "Summary": "Rulers assembled, forming alliances for righteousness or power."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "42",
            "Content_eng": "Krishna, the supreme being in human form, chose to act as a charioteer rather than a warrior.",
            "Content_hin": "कृष्ण, जो परमात्मा के रूप में मानव अवतार थे, योद्धा बनने के बजाय सारथी बनने का विकल्प चुना।",
            "Content_chi": "化身为人的至高存在克里希那，选择担任战车御者而非战士。",
            "Summary": "Krishna chose to guide, not fight—serving as Arjuna’s charioteer."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "43",
            "Content_eng": "Each character, whether noble or flawed, had a role to play in the unfolding of fate.",
            "Content_hin": "प्रत्येक पात्र, चाहे वह महान हो या त्रुटिपूर्ण, भाग्य के प्रवाह में अपनी भूमिका निभा रहा था।",
            "Content_chi": "每一角色，无论高贵或有缺，都在命运的展开中扮演着角色。",
            "Summary": "Every individual contributed to the story destined to unfold."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "44",
            "Content_eng": "The path to Kurukshetra was paved with choices, oaths, and broken promises.",
            "Content_hin": "कुरुक्षेत्र की ओर जाने वाला मार्ग विकल्पों, व्रतों और टूटी हुई प्रतिज्ञाओं से भरा था।",
            "Content_chi": "通往俱卢之地的道路满是抉择、誓言与破碎的承诺。",
            "Summary": "Kurukshetra was inevitable, driven by moral dilemmas and betrayals."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "45",
            "Content_eng": "The epic's greatness lies not just in war, but in the lessons it imparts to the soul.",
            "Content_hin": "इस महाकाव्य की महानता केवल युद्ध में नहीं, बल्कि आत्मा को दिए गए शिक्षाओं में है।",
            "Content_chi": "此史诗之伟大不仅在于战争，更在于其对灵魂的教诲。",
            "Summary": "The Mahabharata's wisdom extends far beyond the battlefield."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "46",
            "Content_eng": "Sauti explained how the story, though ancient, remained ever-relevant for humanity.",
            "Content_hin": "सौति ने बताया कि यह कथा भले ही प्राचीन हो, परंतु आज भी मानवता के लिए अत्यंत प्रासंगिक है।",
            "Content_chi": "索提解释说，这故事虽古老，却对人类始终具有现实意义。",
            "Summary": "Sauti affirms the timeless relevance of the Mahabharata."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "47",
            "Content_eng": "He promised to recount it fully, as it was told by Vyasa and preserved by wise men.",
            "Content_hin": "उसने वचन दिया कि वह इसे पूरी तरह सुनाएगा, जैसे व्यास ने कहा और ज्ञानी जनों ने स्मृत रखा।",
            "Content_chi": "他承诺完整讲述，如毗耶娑所述，智者所记。",
            "Summary": "Sauti vows to deliver Vyasa’s story in full and in truth."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "48",
            "Content_eng": "The sages listened, their minds calm and hearts open, eager to absorb eternal truth.",
            "Content_hin": "ऋषि शांत चित्त और खुले हृदय से सुनते रहे, शाश्वत सत्य को आत्मसात करने की इच्छा लिए।",
            "Content_chi": "圣贤们心平气和，敞开心灵，渴望领悟永恒真理。",
            "Summary": "The sages sat in quiet reflection, ready to receive the wisdom of the epic."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "49",
            "Content_eng": "And thus began the grand narration of the Bharata, vast and immeasurable like the ocean.",
            "Content_hin": "और इस प्रकार महाभारत की महाकथा आरंभ हुई, जो समुद्र के समान विशाल और अथाह है।",
            "Content_chi": "于是婆罗多史诗的宏大叙述开始了，如海般浩瀚无边。",
            "Summary": "The telling of the epic begins—vast, deep, and boundless like the sea."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "50",
            "Content_eng": "Its verses shine like the sun, dispelling the darkness of ignorance for those who hear it with devotion.",
            "Content_hin": "इसके श्लोक सूर्य के समान चमकते हैं, जो भक्ति से सुनने वालों के अज्ञान को दूर करते हैं।",
            "Content_chi": "其诗句如日辉，驱散虔心聆听者心中的无明之暗。",
            "Summary": "The Mahabharata enlightens those who listen with faith and sincerity."
        },

        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "51",
            "Content_eng": "He who listens to this story with reverence gains virtue, wisdom, and liberation from sin.",
            "Content_hin": "जो श्रद्धा से इस कथा को सुनता है, वह पुण्य, ज्ञान और पाप से मुक्ति प्राप्त करता है।",
            "Content_chi": "虔诚聆听此史者，将获福德、智慧与从罪中解脱。",
            "Summary": "Listening to the Mahabharata with faith brings spiritual merit and wisdom."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "52",
            "Content_eng": "This epic is like the Vedas themselves, a source of eternal guidance for those who seek truth.",
            "Content_hin": "यह महाकाव्य स्वयं वेदों के समान है, जो सत्य की खोज करने वालों के लिए शाश्वत मार्गदर्शन है।",
            "Content_chi": "此史诗如同吠陀，为求真者提供永恒指引。",
            "Summary": "The Mahabharata is considered equivalent to the Vedas in spiritual authority."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "53",
            "Content_eng": "All that is found in the world can be found within this epic; what is not here exists nowhere else.",
            "Content_hin": "जो कुछ इस संसार में है, वह इस ग्रंथ में है; जो यहाँ नहीं है, वह कहीं नहीं है।",
            "Content_chi": "世间万象尽在此书；此书未载者，世上亦无。",
            "Summary": "The Mahabharata is said to contain all knowledge—nothing is beyond it."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "54",
            "Content_eng": "The wise have studied it deeply and found within it the paths to peace and liberation.",
            "Content_hin": "ज्ञानी जनों ने इसे गहराई से अध्ययन किया और इसमें शांति और मोक्ष के मार्ग पाए।",
            "Content_chi": "智者深入研读，发现其中通往安宁与解脱之道。",
            "Summary": "Sages have long turned to the Mahabharata for spiritual guidance."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "55",
            "Content_eng": "Its teachings, like sacred rivers, cleanse the hearts of those who immerse in them.",
            "Content_hin": "इसकी शिक्षाएँ पवित्र नदियों के समान हैं, जो इसमें डूबने वालों के हृदय को शुद्ध करती हैं।",
            "Content_chi": "其教义如圣河，净化沉浸其中者之心灵。",
            "Summary": "The teachings of the epic purify the soul like holy waters."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "56",
            "Content_eng": "Even a single verse, if understood deeply, can uplift a person beyond worldly sorrow.",
            "Content_hin": "यदि कोई एक श्लोक भी गहराई से समझा जाए, तो वह व्यक्ति को सांसारिक दुखों से ऊपर उठा सकता है।",
            "Content_chi": "即便一偈若深悟，亦能超越世间之苦。",
            "Summary": "One verse of deep meaning can elevate a soul above suffering."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "57",
            "Content_eng": "Sauti proclaimed that the story he would tell was both vast in scope and deep in wisdom.",
            "Content_hin": "सौति ने घोषणा की कि जो कथा वह सुनाने जा रहे हैं वह विस्तार में विशाल और ज्ञान में गहरी है।",
            "Content_chi": "索提宣称，他将讲述的故事宏大广阔，智慧深远。",
            "Summary": "Sauti prepares the listeners for the depth and breadth of the tale."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "58",
            "Content_eng": "He bowed to the sages once more, seeking their blessings to begin the divine narration.",
            "Content_hin": "उन्होंने पुनः ऋषियों को प्रणाम किया और इस दिव्य कथा को प्रारंभ करने की अनुमति मांगी।",
            "Content_chi": "他再次向圣贤们致敬，请求恩准开始神圣的叙述。",
            "Summary": "Sauti respectfully asks for the sages’ blessings before continuing."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "59",
            "Content_eng": "The sages blessed him, saying, 'May your words flow like the Ganga, pure and powerful.'",
            "Content_hin": "ऋषियों ने उन्हें आशीर्वाद दिया, 'तुम्हारे वचन गंगा की धारा की भांति पवित्र और प्रभावशाली हों।'",
            "Content_chi": "圣贤祝福道：“愿你之言如恒河之水，纯净有力。”",
            "Summary": "The sages bless Sauti, wishing his speech to flow like the holy Ganga."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "60",
            "Content_eng": "With their blessings, Sauti began the sacred story of the Bharatas, as it was once told by Vyasa.",
            "Content_hin": "ऋषियों के आशीर्वाद से, सौति ने उस पवित्र कथा को प्रारंभ किया जैसा कि व्यास ने कभी सुनाया था।",
            "Content_chi": "在圣贤的祝福下，索提开始讲述毗耶娑所传的婆罗多圣史。",
            "Summary": "Sauti begins the epic of the Bharatas, blessed by the sages and guided by Vyasa’s wisdom."
        },

        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "61",
            "Content_eng": "The sages, seated in the Naimisha forest, listened with still minds and hearts open to the divine tale.",
            "Content_hin": "नैमिषारण्य में विराजमान ऋषि स्थिर मन और खुले हृदय से इस दिव्य कथा को सुनने लगे।",
            "Content_chi": "坐于奈密沙林中的圣贤，心神专注，聆听这神圣的故事。",
            "Summary": "The sages listen attentively in the sacred forest as the narration begins."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "62",
            "Content_eng": "Sauti began by invoking the blessings of Vyasa and the divine Saraswati, goddess of speech and wisdom.",
            "Content_hin": "सौति ने व्यास और वाणी व बुद्धि की देवी सरस्वती का आशीर्वाद लेकर कथा आरंभ की।",
            "Content_chi": "索提祈求毗耶娑与言语智慧女神萨拉斯瓦蒂的祝福，开始讲述。",
            "Summary": "Sauti invokes Vyasa and Saraswati before beginning the sacred tale."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "63",
            "Content_eng": "He spoke of King Janamejaya, the great-grandson of Arjuna, who once performed a mighty serpent sacrifice.",
            "Content_hin": "उन्होंने अर्जुन के प्रपौत्र राजा जनमेजय की चर्चा की, जिन्होंने एक महान सर्प यज्ञ किया था।",
            "Content_chi": "他提到阿周那的曾孙阎那美者王，曾举行盛大的蛇祭。",
            "Summary": "Sauti introduces King Janamejaya and his legendary serpent sacrifice."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "64",
            "Content_eng": "At that sacrifice, sage Vaishampayana narrated the Mahabharata as he had heard it from Vyasa.",
            "Content_hin": "उस यज्ञ में महर्षि वैशंपायन ने व्यास से सुनी हुई महाभारत कथा सुनाई।",
            "Content_chi": "在那场祭典上，圣人维商波耶那讲述了从毗耶娑处听来的摩诃婆罗多。",
            "Summary": "Vaishampayana retold the Mahabharata during Janamejaya’s sacrifice."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "65",
            "Content_eng": "Vaishampayana described how the Kurus and Pandavas were born, and how their conflict grew.",
            "Content_hin": "वैशंपायन ने कुरु और पांडवों के जन्म व उनके बीच बढ़ते संघर्ष का वर्णन किया।",
            "Content_chi": "维商波耶那描述了俱卢与般度族的诞生及其日益激烈的冲突。",
            "Summary": "He begins the tale with the birth of the Kuru princes and the origins of their conflict."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "66",
            "Content_eng": "He told of Bhishma, the noble grandsire, who vowed celibacy and shaped the destiny of the throne.",
            "Content_hin": "उन्होंने भीष्म की कथा कही, जिन्होंने ब्रह्मचर्य का व्रत लिया और राज्य के भाग्य को आकार दिया।",
            "Content_chi": "他讲述了伟大的毗湿摩，立誓独身，并决定了王位的命运。",
            "Summary": "The vow of Bhishma and his role in shaping the kingdom is introduced."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "67",
            "Content_eng": "Then came the tale of the blind king Dhritarashtra and his brother Pandu, father of the Pandavas.",
            "Content_hin": "इसके बाद अंधे राजा धृतराष्ट्र और उनके भाई पांडु की कथा आई, जो पांडवों के पिता थे।",
            "Content_chi": "接着讲到盲王德里多剎罗与其弟般度，后者是般度五子的父亲。",
            "Summary": "Dhritarashtra and Pandu’s roles in the family lineage are described."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "68",
            "Content_eng": "Due to a curse, Pandu renounced the throne and retreated to the forest with his wives.",
            "Content_hin": "एक श्राप के कारण पांडु ने राजगद्दी त्याग दी और अपनी पत्नियों संग वन में चले गए।",
            "Content_chi": "因诅咒，般度放弃王位，与其妻前往森林隐居。",
            "Summary": "Pandu relinquishes his kingship and retreats to the forest due to a curse."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "69",
            "Content_eng": "There, through divine blessings, his wives bore the five heroic sons known as the Pandavas.",
            "Content_hin": "वहाँ, दिव्य वरदानों से उनकी पत्नियों ने पाँच पराक्रमी पुत्रों—पांडवों—को जन्म दिया।",
            "Content_chi": "在那里，借助神的祝福，他的妻子们生下了五位英勇的儿子，即般度五子。",
            "Summary": "The birth of the Pandavas in the forest through divine intervention is told."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "70",
            "Content_eng": "Thus began the saga of the Pandavas and Kauravas, which would shape the destiny of Bharatavarsha.",
            "Content_hin": "इस प्रकार पांडवों और कौरवों की गाथा आरंभ हुई, जो भरतवर्ष के भाग्य को निर्धारित करने वाली थी।",
            "Content_chi": "于是般度与俱卢之史诗开始，注定将左右婆罗多大地的命运。",
            "Summary": "The story of the Pandavas and Kauravas begins, setting the stage for the great epic."
        },

        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "61",
            "Content_eng": "The sages, seated in the Naimisha forest, listened with still minds and hearts open to the divine tale.",
            "Content_hin": "नैमिषारण्य में विराजमान ऋषि स्थिर मन और खुले हृदय से इस दिव्य कथा को सुनने लगे।",
            "Content_chi": "坐于奈密沙林中的圣贤，心神专注，聆听这神圣的故事。",
            "Summary": "The sages listen attentively in the sacred forest as the narration begins."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "62",
            "Content_eng": "Sauti began by invoking the blessings of Vyasa and the divine Saraswati, goddess of speech and wisdom.",
            "Content_hin": "सौति ने व्यास और वाणी व बुद्धि की देवी सरस्वती का आशीर्वाद लेकर कथा आरंभ की।",
            "Content_chi": "索提祈求毗耶娑与言语智慧女神萨拉斯瓦蒂的祝福，开始讲述。",
            "Summary": "Sauti invokes Vyasa and Saraswati before beginning the sacred tale."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "63",
            "Content_eng": "He spoke of King Janamejaya, the great-grandson of Arjuna, who once performed a mighty serpent sacrifice.",
            "Content_hin": "उन्होंने अर्जुन के प्रपौत्र राजा जनमेजय की चर्चा की, जिन्होंने एक महान सर्प यज्ञ किया था।",
            "Content_chi": "他提到阿周那的曾孙阎那美者王，曾举行盛大的蛇祭。",
            "Summary": "Sauti introduces King Janamejaya and his legendary serpent sacrifice."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "64",
            "Content_eng": "At that sacrifice, sage Vaishampayana narrated the Mahabharata as he had heard it from Vyasa.",
            "Content_hin": "उस यज्ञ में महर्षि वैशंपायन ने व्यास से सुनी हुई महाभारत कथा सुनाई।",
            "Content_chi": "在那场祭典上，圣人维商波耶那讲述了从毗耶娑处听来的摩诃婆罗多。",
            "Summary": "Vaishampayana retold the Mahabharata during Janamejaya’s sacrifice."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "65",
            "Content_eng": "Vaishampayana described how the Kurus and Pandavas were born, and how their conflict grew.",
            "Content_hin": "वैशंपायन ने कुरु और पांडवों के जन्म व उनके बीच बढ़ते संघर्ष का वर्णन किया।",
            "Content_chi": "维商波耶那描述了俱卢与般度族的诞生及其日益激烈的冲突。",
            "Summary": "He begins the tale with the birth of the Kuru princes and the origins of their conflict."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "66",
            "Content_eng": "He told of Bhishma, the noble grandsire, who vowed celibacy and shaped the destiny of the throne.",
            "Content_hin": "उन्होंने भीष्म की कथा कही, जिन्होंने ब्रह्मचर्य का व्रत लिया और राज्य के भाग्य को आकार दिया।",
            "Content_chi": "他讲述了伟大的毗湿摩，立誓独身，并决定了王位的命运。",
            "Summary": "The vow of Bhishma and his role in shaping the kingdom is introduced."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "67",
            "Content_eng": "Then came the tale of the blind king Dhritarashtra and his brother Pandu, father of the Pandavas.",
            "Content_hin": "इसके बाद अंधे राजा धृतराष्ट्र और उनके भाई पांडु की कथा आई, जो पांडवों के पिता थे।",
            "Content_chi": "接着讲到盲王德里多剎罗与其弟般度，后者是般度五子的父亲。",
            "Summary": "Dhritarashtra and Pandu’s roles in the family lineage are described."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "68",
            "Content_eng": "Due to a curse, Pandu renounced the throne and retreated to the forest with his wives.",
            "Content_hin": "एक श्राप के कारण पांडु ने राजगद्दी त्याग दी और अपनी पत्नियों संग वन में चले गए।",
            "Content_chi": "因诅咒，般度放弃王位，与其妻前往森林隐居。",
            "Summary": "Pandu relinquishes his kingship and retreats to the forest due to a curse."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "69",
            "Content_eng": "There, through divine blessings, his wives bore the five heroic sons known as the Pandavas.",
            "Content_hin": "वहाँ, दिव्य वरदानों से उनकी पत्नियों ने पाँच पराक्रमी पुत्रों—पांडवों—को जन्म दिया।",
            "Content_chi": "在那里，借助神的祝福，他的妻子们生下了五位英勇的儿子，即般度五子。",
            "Summary": "The birth of the Pandavas in the forest through divine intervention is told."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "70",
            "Content_eng": "Thus began the saga of the Pandavas and Kauravas, which would shape the destiny of Bharatavarsha.",
            "Content_hin": "इस प्रकार पांडवों और कौरवों की गाथा आरंभ हुई, जो भरतवर्ष के भाग्य को निर्धारित करने वाली थी।",
            "Content_chi": "于是般度与俱卢之史诗开始，注定将左右婆罗多大地的命运。",
            "Summary": "The story of the Pandavas and Kauravas begins, setting the stage for the great epic."
        },

        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "61",
            "Content_eng": "The sages, seated in the Naimisha forest, listened with still minds and hearts open to the divine tale.",
            "Content_hin": "नैमिषारण्य में विराजमान ऋषि स्थिर मन और खुले हृदय से इस दिव्य कथा को सुनने लगे।",
            "Content_chi": "坐于奈密沙林中的圣贤，心神专注，聆听这神圣的故事。",
            "Summary": "The sages listen attentively in the sacred forest as the narration begins."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "62",
            "Content_eng": "Sauti began by invoking the blessings of Vyasa and the divine Saraswati, goddess of speech and wisdom.",
            "Content_hin": "सौति ने व्यास और वाणी व बुद्धि की देवी सरस्वती का आशीर्वाद लेकर कथा आरंभ की।",
            "Content_chi": "索提祈求毗耶娑与言语智慧女神萨拉斯瓦蒂的祝福，开始讲述。",
            "Summary": "Sauti invokes Vyasa and Saraswati before beginning the sacred tale."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "63",
            "Content_eng": "He spoke of King Janamejaya, the great-grandson of Arjuna, who once performed a mighty serpent sacrifice.",
            "Content_hin": "उन्होंने अर्जुन के प्रपौत्र राजा जनमेजय की चर्चा की, जिन्होंने एक महान सर्प यज्ञ किया था।",
            "Content_chi": "他提到阿周那的曾孙阎那美者王，曾举行盛大的蛇祭。",
            "Summary": "Sauti introduces King Janamejaya and his legendary serpent sacrifice."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "64",
            "Content_eng": "At that sacrifice, sage Vaishampayana narrated the Mahabharata as he had heard it from Vyasa.",
            "Content_hin": "उस यज्ञ में महर्षि वैशंपायन ने व्यास से सुनी हुई महाभारत कथा सुनाई।",
            "Content_chi": "在那场祭典上，圣人维商波耶那讲述了从毗耶娑处听来的摩诃婆罗多。",
            "Summary": "Vaishampayana retold the Mahabharata during Janamejaya’s sacrifice."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "65",
            "Content_eng": "Vaishampayana described how the Kurus and Pandavas were born, and how their conflict grew.",
            "Content_hin": "वैशंपायन ने कुरु और पांडवों के जन्म व उनके बीच बढ़ते संघर्ष का वर्णन किया।",
            "Content_chi": "维商波耶那描述了俱卢与般度族的诞生及其日益激烈的冲突。",
            "Summary": "He begins the tale with the birth of the Kuru princes and the origins of their conflict."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "66",
            "Content_eng": "He told of Bhishma, the noble grandsire, who vowed celibacy and shaped the destiny of the throne.",
            "Content_hin": "उन्होंने भीष्म की कथा कही, जिन्होंने ब्रह्मचर्य का व्रत लिया और राज्य के भाग्य को आकार दिया।",
            "Content_chi": "他讲述了伟大的毗湿摩，立誓独身，并决定了王位的命运。",
            "Summary": "The vow of Bhishma and his role in shaping the kingdom is introduced."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "67",
            "Content_eng": "Then came the tale of the blind king Dhritarashtra and his brother Pandu, father of the Pandavas.",
            "Content_hin": "इसके बाद अंधे राजा धृतराष्ट्र और उनके भाई पांडु की कथा आई, जो पांडवों के पिता थे।",
            "Content_chi": "接着讲到盲王德里多剎罗与其弟般度，后者是般度五子的父亲。",
            "Summary": "Dhritarashtra and Pandu’s roles in the family lineage are described."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "68",
            "Content_eng": "Due to a curse, Pandu renounced the throne and retreated to the forest with his wives.",
            "Content_hin": "एक श्राप के कारण पांडु ने राजगद्दी त्याग दी और अपनी पत्नियों संग वन में चले गए।",
            "Content_chi": "因诅咒，般度放弃王位，与其妻前往森林隐居。",
            "Summary": "Pandu relinquishes his kingship and retreats to the forest due to a curse."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "69",
            "Content_eng": "There, through divine blessings, his wives bore the five heroic sons known as the Pandavas.",
            "Content_hin": "वहाँ, दिव्य वरदानों से उनकी पत्नियों ने पाँच पराक्रमी पुत्रों—पांडवों—को जन्म दिया।",
            "Content_chi": "在那里，借助神的祝福，他的妻子们生下了五位英勇的儿子，即般度五子。",
            "Summary": "The birth of the Pandavas in the forest through divine intervention is told."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "70",
            "Content_eng": "Thus began the saga of the Pandavas and Kauravas, which would shape the destiny of Bharatavarsha.",
            "Content_hin": "इस प्रकार पांडवों और कौरवों की गाथा आरंभ हुई, जो भरतवर्ष के भाग्य को निर्धारित करने वाली थी।",
            "Content_chi": "于是般度与俱卢之史诗开始，注定将左右婆罗多大地的命运。",
            "Summary": "The story of the Pandavas and Kauravas begins, setting the stage for the great epic."
        },

        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "71",
            "Content_eng": "As the princes grew, they learned scriptures, warfare, and virtues under the guidance of sages.",
            "Content_hin": "जब राजकुमार बड़े हुए, उन्होंने ऋषियों के मार्गदर्शन में शास्त्र, युद्धकला और धर्म सीखा।",
            "Content_chi": "随着王子们长大，在圣人的指导下学习经文、战艺与美德。",
            "Summary": "The Kauravas and Pandavas were trained in both knowledge and arms by sages."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "72",
            "Content_eng": "Drona, the mighty preceptor, was appointed to train them in archery and combat.",
            "Content_hin": "द्रोणाचार्य, पराक्रमी आचार्य, को उन्हें धनुर्विद्या और युद्ध की शिक्षा देने के लिए नियुक्त किया गया।",
            "Content_chi": "强大的导师德罗那被任命教授他们射箭与战斗之术。",
            "Summary": "Drona becomes the martial teacher of both the Pandavas and Kauravas."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "73",
            "Content_eng": "Arjuna, the third Pandava, excelled among all, becoming Drona’s favorite pupil.",
            "Content_hin": "अर्जुन, तीसरे पांडव, सभी में श्रेष्ठ बने और द्रोण के प्रिय शिष्य हो गए।",
            "Content_chi": "第三位般度子阿周那技艺超群，成为德罗那最钟爱的弟子。",
            "Summary": "Arjuna surpasses all in skill, earning Drona’s admiration."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "74",
            "Content_eng": "This excellence of Arjuna ignited jealousy in Duryodhana and his brothers.",
            "Content_hin": "अर्जुन की इस श्रेष्ठता से दुर्योधन और उसके भाइयों में ईर्ष्या उत्पन्न हुई।",
            "Content_chi": "阿周那的卓越引发了都楼与其兄弟们的嫉妒。",
            "Summary": "Arjuna’s prowess leads to growing envy among the Kauravas."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "75",
            "Content_eng": "To match Arjuna, Duryodhana allied with Karna, a warrior of great strength and mystery.",
            "Content_hin": "अर्जुन की बराबरी करने के लिए दुर्योधन ने एक महान और रहस्यमय योद्धा कर्ण से मित्रता की।",
            "Content_chi": "为与阿周那匹敌，都楼与神秘强大的战士迦尔纳结盟。",
            "Summary": "Duryodhana befriends Karna to rival Arjuna’s strength."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "76",
            "Content_eng": "Meanwhile, the kingdom of Hastinapura became tense, with rivalry brewing silently.",
            "Content_hin": "उधर, हस्तिनापुर का राज्य तनावपूर्ण हो उठा, और प्रतिद्वंद्विता चुपचाप बढ़ने लगी।",
            "Content_chi": "与此同时，哈斯提那普尔王国气氛紧张，暗中酝酿着竞争。",
            "Summary": "Tensions in the kingdom rise as rivalry intensifies."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "77",
            "Content_eng": "Dhritarashtra, blinded by affection for his sons, ignored the signs of conflict.",
            "Content_hin": "धृतराष्ट्र अपने पुत्रों के प्रति स्नेहवश अंध थे और संघर्ष के संकेतों को अनदेखा करते रहे।",
            "Content_chi": "德里多剎罗因宠爱子嗣而盲目，无视冲突的征兆。",
            "Summary": "King Dhritarashtra fails to act due to bias toward his sons."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "78",
            "Content_eng": "Wise Vidura warned him often, but the king's heart leaned only toward the Kauravas.",
            "Content_hin": "बुद्धिमान विदुर ने उन्हें कई बार चेताया, परंतु राजा का हृदय केवल कौरवों की ओर झुका रहा।",
            "Content_chi": "智者毗度罗屡次劝告，然王心始终偏向俱卢子孙。",
            "Summary": "Vidura’s advice goes unheeded as the king favors his own."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "79",
            "Content_eng": "The seeds of war were thus quietly sown, though none could see how soon they would sprout.",
            "Content_hin": "युद्ध के बीज चुपचाप बोए जा चुके थे, हालांकि कोई नहीं जानता था कि वे कब अंकुरित होंगे।",
            "Content_chi": "战争的种子悄然播下，众人尚不知其何时萌芽。",
            "Summary": "The silent build-up toward war continues unnoticed by most."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "80",
            "Content_eng": "And so the tale moved forward, toward a destiny shaped by choice, pride, and the will of the divine.",
            "Content_hin": "और इस प्रकार कथा आगे बढ़ी, एक ऐसे भाग्य की ओर जो विकल्पों, अहंकार और दिव्य इच्छा से निर्मित था।",
            "Content_chi": "于是故事继续前行，朝着由选择、傲慢与神意塑造的命运迈进。",
            "Summary": "The story marches toward the destined clash, guided by human and divine forces."
        },

        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "81",
            "Content_eng": "In their youth, the Pandavas earned the people's love, admired for their conduct and courage.",
            "Content_hin": "यौवन में पांडवों ने अपने आचरण और साहस से जनमानस का प्रेम अर्जित किया।",
            "Content_chi": "般度五子在少年时期因品德与勇气赢得民众敬爱。",
            "Summary": "The Pandavas grew popular for their virtue and bravery."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "82",
            "Content_eng": "This rising fame troubled Duryodhana, who feared losing his claim to the throne.",
            "Content_hin": "पांडवों की बढ़ती ख्याति से दुर्योधन व्याकुल हो उठा, उसे सिंहासन खोने का भय सताने लगा।",
            "Content_chi": "般度五子的声望使都楼不安，担心王位旁落。",
            "Summary": "Duryodhana becomes anxious about the Pandavas’ growing influence."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "83",
            "Content_eng": "With cunning Shakuni’s counsel, Duryodhana devised schemes to harm the Pandavas.",
            "Content_hin": "चालाक शकुनि की सलाह पर दुर्योधन ने पांडवों को हानि पहुँचाने की योजनाएँ बनाईं।",
            "Content_chi": "在狡诈的沙恭尼建议下，都楼开始筹谋加害般度五子。",
            "Summary": "Shakuni advises Duryodhana to plot against the Pandavas."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "84",
            "Content_eng": "They invited the Pandavas to a grand house made of lacquer, secretly designed to burn.",
            "Content_hin": "उन्होंने पांडवों को लाक्षागृह नामक भव्य भवन में आमंत्रित किया, जिसे गुप्त रूप से जलाने के लिए बनाया गया था।",
            "Content_chi": "他们邀请般度五子前往一座以漆建成的宫殿，实为纵火而设。",
            "Summary": "A deadly trap is set for the Pandavas in the form of a lacquer palace."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "85",
            "Content_eng": "But Vidura, wise and loyal, warned them in a riddle, and the Pandavas understood the danger.",
            "Content_hin": "परन्तु विदुर ने संकेतों में उन्हें चेताया और पांडवों ने संकट को भांप लिया।",
            "Content_chi": "智者毗度罗以谜语暗示，般度五子识破阴谋。",
            "Summary": "Vidura’s subtle warning helps the Pandavas escape the plot."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "86",
            "Content_eng": "They escaped through a secret tunnel on the night the house was set on fire.",
            "Content_hin": "जिस रात लाक्षागृह में आग लगाई गई, उस रात पांडव गुप्त सुरंग के रास्ते भाग निकले।",
            "Content_chi": "在漆屋被纵火当夜，般度五子由密道逃脱。",
            "Summary": "The Pandavas flee through a tunnel before the fire consumes the palace."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "87",
            "Content_eng": "The world believed them dead, and Duryodhana rejoiced, thinking his path to power was clear.",
            "Content_hin": "संसार ने उन्हें मृत मान लिया और दुर्योधन प्रसन्न हुआ कि उसका मार्ग अब निष्कंटक है।",
            "Content_chi": "世人皆以为他们已死，都楼欣喜，以为大权在握。",
            "Summary": "The Pandavas are presumed dead, and Duryodhana feels victorious."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "88",
            "Content_eng": "Meanwhile, the Pandavas wandered in forests, disguised and cautious, protecting their mother Kunti.",
            "Content_hin": "उधर, पांडव अपनी माता कुंती के साथ वनों में भेष बदलकर सतर्कता से विचरण करते रहे।",
            "Content_chi": "与此同时，般度五子与母亲昆蒂乔装在林中小心行走。",
            "Summary": "The Pandavas live incognito in the forest with their mother."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "89",
            "Content_eng": "During their exile, they encountered many sages and learned deeper truths of dharma and life.",
            "Content_hin": "निर्वासन के दौरान, उन्होंने अनेक ऋषियों से भेंट की और धर्म व जीवन की गहन शिक्षाएँ प्राप्त कीं।",
            "Content_chi": "在流亡期间，他们拜访众多圣者，学习更深的法义与人生智慧。",
            "Summary": "In exile, the Pandavas grow wiser through encounters with sages."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "90",
            "Content_eng": "Their trials would only grow, but destiny had set them on a path to greatness.",
            "Content_hin": "उनकी परीक्षाएँ आगे और बढ़ने वाली थीं, परंतु भाग्य ने उन्हें महानता की राह पर अग्रसर किया था।",
            "Content_chi": "他们的考验尚未结束，命运却早已为他们铺就伟大的道路。",
            "Summary": "Though challenges awaited, the Pandavas were destined for greatness."
        },

        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "91",
            "Content_eng": "In their wandering, the Pandavas reached Ekachakra, a peaceful town where they chose to rest.",
            "Content_hin": "अपने भ्रमण के दौरान पांडव एक शांत नगर एकचक्रा पहुँचे, जहाँ उन्होंने विश्राम किया।",
            "Content_chi": "在流浪途中，般度五子来到宁静的城镇一车罗，选择栖息。",
            "Summary": "The Pandavas arrive in Ekachakra and decide to stay hidden there."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "92",
            "Content_eng": "There, they lived simply, taking alms and helping the local people in secret.",
            "Content_hin": "वहाँ वे साधारण जीवन जीते, भिक्षा लेते और गुप्त रूप से स्थानीय लोगों की सहायता करते।",
            "Content_chi": "他们过着简朴生活，靠乞食维生，暗中帮助民众。",
            "Summary": "While in hiding, the Pandavas serve the people and live humbly."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "93",
            "Content_eng": "In that town, a demon named Bakasura terrorized the people by demanding food and lives.",
            "Content_hin": "उस नगर में बकासुर नामक राक्षस लोगों से भोजन और जीवन की बलि माँगता था।",
            "Content_chi": "该镇有一名恶魔叫跋迦娑罗，向百姓索取食物与生命。",
            "Summary": "The town of Ekachakra lived in fear of the demon Bakasura."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "94",
            "Content_eng": "When it was their host’s turn to offer his child, Bhima stepped in to confront the demon.",
            "Content_hin": "जब उनके मेज़बान की बारी आई अपने पुत्र को बलि देने की, भीम ने उस राक्षस से लड़ने का निर्णय लिया।",
            "Content_chi": "轮到他们的东道主献子之时，毗摩挺身而出对抗魔王。",
            "Summary": "Bhima decides to face Bakasura to save their host's family."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "95",
            "Content_eng": "Bhima fought Bakasura fiercely and killed him, freeing the town from terror.",
            "Content_hin": "भीम ने बकासुर से घमासान युद्ध कर उसे मार डाला और नगर को भय से मुक्त किया।",
            "Content_chi": "毗摩与跋迦娑罗激战，将其击毙，解救了百姓。",
            "Summary": "Bhima slays Bakasura and saves the people of Ekachakra."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "96",
            "Content_eng": "Their fame grew again, though their identity remained hidden from most.",
            "Content_hin": "उनकी कीर्ति फिर से फैलने लगी, यद्यपि अधिकांश लोग उनकी पहचान नहीं जानते थे।",
            "Content_chi": "他们的声望再度上升，尽管真实身份仍未显露。",
            "Summary": "Bhima's deed spreads their fame, but their identity stays hidden."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "97",
            "Content_eng": "Soon, the news reached of a swayamvara to be held for Princess Draupadi.",
            "Content_hin": "शीघ्र ही, द्रौपदी के स्वयंवर की घोषणा की खबर पहुँची।",
            "Content_chi": "不久，公主德劳帕蒂的自选夫仪式之消息传来。",
            "Summary": "Word spreads of Draupadi’s swayamvara, attracting attention across kingdoms."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "98",
            "Content_eng": "The Pandavas, curious and cautious, decided to attend in disguise.",
            "Content_hin": "पांडवों ने जिज्ञासावश और सतर्कता से वेश बदलकर स्वयंवर में जाने का निर्णय लिया।",
            "Content_chi": "般度五子出于谨慎与好奇，乔装前往参加。",
            "Summary": "The Pandavas decide to attend Draupadi’s swayamvara in disguise."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "99",
            "Content_eng": "There, Arjuna won Draupadi’s hand by completing a mighty test of skill.",
            "Content_hin": "वहाँ, अर्जुन ने एक महान कौशल परीक्षा को पूरा कर द्रौपदी का हाथ जीत लिया।",
            "Content_chi": "在场中，阿周那完成高难挑战，赢得德劳帕蒂的芳心。",
            "Summary": "Arjuna wins Draupadi at the swayamvara by his archery skill."
        },
        {
            "Book_id": "1",
            "Chapter_id": "1",
            "Verse_id": "100",
            "Content_eng": "With Draupadi now their wife, the Pandavas' return to power was set in motion by fate.",
            "Content_hin": "द्रौपदी अब उनकी पत्नी बन गईं और भाग्य ने पांडवों की सत्ता में वापसी की राह खोल दी।",
            "Content_chi": "德劳帕蒂成为他们的妻子，命运由此启动般度五子的复兴之路。",
            "Summary": "Draupadi’s marriage to the Pandavas marks the beginning of their return to power."
        }
    ]
  /* PASTE YOUR FULL 100-ENTRY JSON HERE EXACTLY AS-IS */
];
// ---------------- END_RAW_DATA ------------------

// Normalize any array-of-array to a flat array, and leave objects untouched if already flat.
function normalizeData(data) {
  if (!Array.isArray(data)) throw new Error('RAW_DATA must be an array.');
  // If it's [[...]], flatten one level
  if (data.length === 1 && Array.isArray(data[0])) return data[0];
  // If it's already flat [...], return as-is
  return data;
}

// ---------------- Seed + print ----------------
// Set ALWAYS_RESET=false to keep existing data.
const ALWAYS_RESET = (process.env.ALWAYS_RESET ?? 'true').toLowerCase() === 'true';

async function seedAndPrint() {
  try {
    const docs = normalizeData(RAW_DATA);

    if (ALWAYS_RESET) {
      await Entry.deleteMany({});
      console.log('🧹 Cleared existing docs.');
      if (docs.length) {
        // Use ordered:false so duplicates in your raw list (if any) won’t crash the insert
        await Entry.insertMany(docs, { ordered: false });
        console.log(`🌱 Seeded ${docs.length} docs (fresh).`);
      }
    } else {
      // Upsert each doc so you can re-run without clearing
      let insertedOrUpdated = 0;
      for (const d of docs) {
        const filter = {
          Book_id: String(d.Book_id),
          Chapter_id: String(d.Chapter_id),
          Verse_id: String(d.Verse_id)
        };
        const update = { $set: d };
        const res = await Entry.updateOne(filter, update, { upsert: true });
        if (res.upsertedCount || res.modifiedCount) insertedOrUpdated++;
      }
      console.log(`🌱 Upserted ${insertedOrUpdated} / ${docs.length} docs.`);
    }

    const count = await Entry.estimatedDocumentCount();
    console.log(`📦 Collection now has ${count} docs.`);

    const sample = await Entry.find().sort({ Book_id: 1, Chapter_id: 1, Verse_id: 1 }).limit(10);
    console.log('📜 First 10 (summary):',
      sample.map(d => ({
        Book_id: d.Book_id, Chapter_id: d.Chapter_id, Verse_id: d.Verse_id, Summary: d.Summary
      }))
    );
  } catch (err) {
    console.error('❌ Error during seed/print:', err);
  }
}

// ---------------- Routes ----------------
app.get('/entries', async (req, res) => {
  try {
    const q = {};
    if (req.query.book) q.Book_id = String(req.query.book);
    if (req.query.chapter) q.Chapter_id = String(req.query.chapter);
    if (req.query.verse) q.Verse_id = String(req.query.verse);

    const entries = await Entry.find(q).sort({ Book_id: 1, Chapter_id: 1, Verse_id: 1 });
    res.json(entries);
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

app.post('/entries', async (req, res) => {
  try {
    const doc = await Entry.create(req.body);
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).send(err.toString());
  }
});

// ---------------- Start server ----------------
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Express server running at http://localhost:${PORT}`);
  console.log(`➡️  Try:  http://localhost:${PORT}/entries`);
  seedAndPrint();
});




// npm i express mongoose cors
// node printMahabharatha.js
// http://localhost:3001/entries
