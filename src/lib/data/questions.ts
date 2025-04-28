type ImageContext = {
    type: 'image';
    title: string;
    description?: string;
    imageUrl: string;
    citation: string;
    caption?: string;
};

type TextContext = {
    type: 'text';
    content: string;
    source: string;
};

type SAQQuestion = {
    context?: ImageContext | TextContext;
    parts: string[];
};

type SAQSet = {
    label: string;
    questions: SAQQuestion[];
}

export const saqSets: SAQSet[] = [
    // #region 2024 SAQ Set 1
    {
        label: "2024 SAQ Set 1",
        questions: [
            {
                context: {
                    type: 'text',
                    content: "Under the Mughals, Hindus and Muslims interacted in economics, politics, social life, the arts, and culture. Through migration and conversion, the Muslim population of India grew from about 400,000 in 1200, . . . to 12.8 million in 1535, to perhaps 50 million by 1800. Muslim scholars and Sufi religious mystics and saints migrated to India from Iran, Turkey, and Central Asia. Some came in search of government jobs, others for new cultural opportunities, to study, or to spread their own beliefs. Some of the best poets immigrated from Persia.\n\nSimilarly, imperial court painters, who produced masterpieces in the Persian and Mughal miniature styles, interacted with painters of the Rajput schools in local Hindu courts across north India, resulting in artistic innovations in both. On the level of mystical belief and experience, an astonishing syncretism emerged between Hindus and Muslims, especially in the poetry of Kabir [died circa 1520] and of Guru Nanak (1469–1538), the originator of the Sikh religion. Mystics in the two communities, Hindu bhakti (devotional) worshippers and Muslim Sufis, frequently had warm personal relations and often attracted followers from each others’ communities.",
                    source: "Howard Spodek and Michele Langford Louro, United States historians, article published in a scholarly journal, 2007"
                },
                parts: [
                    "Identify ONE claim that the authors make in the first paragraph.",
                    "Identify ONE piece of evidence that the authors use to support their claims about cultural interactions between Hindus and Muslims as described in the second paragraph.",
                    "Explain ONE reason why Mughal rulers in the period circa 1450–1750 would have encouraged the interactions described in the passage."
                ]
            },
            {
                context: {
                    type: 'image',
                    title: "Election Poster for the German National Socialist Party, 1932",
                    description: "The German text in the poster reads, “Men! Women! Millions of men without work; millions of children without futures. Save the German family—vote for Adolf Hitler.",
                    imageUrl: "/images/2024_set1_saq2.jpeg",
                    citation: "Album/ Alamy Stock Photo"
                },
                parts: [
                    "Identify ONE likely political purpose of the image.",
                    "Explain ONE way the image illustrates the economic situation of the period after the First World War.",
                    "Explain ONE way the rise of the German National Socialist Party led to the Second World War."
                ]
            },
            {
                parts: [
                    "Identify ONE method Europeans used to expand their empires in the Americas in the period circa 1450–1750.",
                    "Explain ONE way European colonialism affected Indigenous peoples in the Americas in the period circa 1450–1750.",
                    "Explain ONE way European interactions with non-European peoples in the Americas contributed to the development of a global economy in the period circa 1450–1750.",
                ]
            },
            {
                parts: [
                    "Identify ONE way Asians resisted Western imperialism in the period circa 1800–1914.",
                    "Explain ONE way European imperialism changed the cultures of peoples in Asia in the period circa 1800–1914.",
                    "Explain ONE way European imperialism in Asia contributed to changes in the global economy in the period circa 1800–1914."
                ]
            }
        ]
    },
    // #endregion
    // #region 2024 SAQ Set 2
    {
        label: "2024 SAQ Set 2",
        questions: [
            {
                context: {
                    type: 'text',
                    content: "[A]lready well before the twelfth and thirteenth centuries, an enormous amount of [history] had been written, and Muslims were well on their way to generating a tradition that outstripped in size and quality anything written by . . . Jews or Christians. The impulse [for so much history writing] was two-fold. [First], the spectacular success of empire building during the seventh and eighth centuries created a market of readers hungry for historical narrative, . . . which offered lessons and models to rulers, their courts, and urban elites. . . . Second, . . . many were enthusiastic about those forms [of history writing] that reinforced traditional religious institutions . . . and attitudes. In practice, this meant that they wrote a great many [biographies] of religious figures and of the Prophet [Muhammad]. . . .\n\nMuslim states had a stake in learning in general and [history writing] in particular. Nearly all states [sponsored history writing and art creation] that legitimized their exercise of power, and large-scale learning depended on urban networks of knowledge—reading, teaching, writing—that states cultivated and defended. It is this—the mutual attraction of historians and ambitious states—that explains the [development of Islamic history writing].",
                    source: "Chase F. Robinson, historian, Islamic Historiography, book written in 2003"
                },
                parts: [
                    "Identify ONE argument that the author makes in the first paragraph.",
                    "Identify ONE piece of evidence that the author uses to support an argument in the passage.",
                    "Explain how ONE development in the period 1200–1750 could be used to support the author’s argument in the second paragraph about history writing and art creation legitimizing states’ exercise of power."
                ]
            },
            {
                context: {
                    type: 'image',
                    title: "Graduation Ceremony at a Christian Theological Seminary in Northern India, 1897",
                    imageUrl: "/images/2024_set2_saq2.jpeg",
                    citation: "© The Trustees of the British Museum",
                    caption: "The image shows two British missionaries (second row, center) surrounded by Indian graduates. The seminary (religious school) was founded in 1871 to educate and train Indian missionaries."
                },
                parts: [
                    "Identify ONE development during the period 1450 to 1750 that contributed to the activities shown in the image.",
                    "Explain ONE reason why imperialist governments often supported activities of the type shown in the image during the nineteenth and early twentieth centuries.",
                    "Explain ONE way indigenous peoples in Africa and/or Asia resisted the spread of the cultural practices reflected in the image during the nineteenth and early twentieth centuries."
                ]
            },
            {
                parts: [
                    "Identify ONE development in the period circa 1200–1300 that facilitated the establishment of the Mongol Empire.",
                    "Identify ONE development in the period circa 1200–1300 that enabled the Mongol Empire to facilitate Afro-Eurasian trade and/or communications.",
                    "Explain ONE reason why the Mongol khanates often facilitated the spread of cultural or religious practices."
                ]
            },
            {
                parts: [
                    "Identify ONE political factor in the period after 1945 that facilitated the establishment of independent postcolonial states in Africa.",
                    "Identify ONE economic factor in the period after 1945 that facilitated the establishment of independent postcolonial states in Africa.",
                    "Explain ONE reason why postcolonial states in Africa often adopted communist or socialist ideologies."
                ]
            }
        ]
    }
    // #endregion
];