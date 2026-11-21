export type LocalizedText = {
  ar: string;
  en: string;
};

export type ScenarioEmotionOption = {
  id: string;
  symbol: string;
  name: LocalizedText;
  note: LocalizedText;
  isPrimary: boolean;
};

export type ScenarioEmotion = ScenarioEmotionOption;

export type ScenarioAction = {
  id: string;
  icon: "avoid" | "impulse" | "regulate";
  tag: LocalizedText;
  name: LocalizedText;
  note: LocalizedText;
  outcome: {
    eyebrow: LocalizedText;
    title: LocalizedText;
    body: LocalizedText;
  };
};

export type ScenarioContent = {
  id: number;
  internalTitle: LocalizedText;
  mystery: {
    label: LocalizedText;
    eyebrow: LocalizedText;
    title: LocalizedText;
    body: LocalizedText;
  };
  scene: {
    heading: LocalizedText;
    body: LocalizedText;
  };
  emotion: {
    question: LocalizedText;
    hint: LocalizedText;
    options: ScenarioEmotionOption[];
  };
  behavior: {
    question: LocalizedText;
    hint: LocalizedText;
    options: ScenarioAction[];
  };
  reflectionPrompt: LocalizedText;
};

export const scenarioContents: ScenarioContent[] = [
  {
    id: 1,
    internalTitle: {
      ar: "البيئة المدرسية - ضغط الاختبار المفاجئ",
      en: "School environment - surprise-test pressure",
    },
    mystery: {
      label: { ar: "صدى متسارع", en: "Racing echo" },
      eyebrow: { ar: "وصلت إشارة جديدة", en: "A new signal has arrived" },
      title: { ar: "هناك شيء غير متوقّع ينتظر نوفا", en: "Something unexpected is waiting for Nova" },
      body: {
        ar: "اقترب بهدوء. يمكنك التوقف أو العودة إلى الخريطة في أي لحظة.",
        en: "Approach calmly. You can pause or return to the map at any time.",
      },
    },
    scene: {
      heading: { ar: "اختبار دون موعد", en: "A test without warning" },
      body: {
        ar: "في الصف، توزّع المعلمة أوراق اختبار صعب ومفاجئ. الوقت يمر بسرعة، والزملاء يكتبون، بينما تشعر نوفا بتشتت الذهن ولا تتذكر الإجابات.",
        en: "In class, the teacher hands out a difficult surprise test. Time is moving quickly and classmates are writing, while Nova feels overwhelmed and cannot remember the answers.",
      },
    },
    emotion: {
      question: {
        ar: "ماذا تشعر الشخصية في هذه اللحظة؟",
        en: "What might Nova be feeling in this moment?",
      },
      hint: {
        ar: "لاحظ ما يحدث في الجسد والأفكار قبل اختيار الشعور الأقرب.",
        en: "Notice what is happening in the body and thoughts before choosing the closest feeling.",
      },
      options: [
        {
          id: "anxiety",
          symbol: "≈",
          name: { ar: "التوتر والقلق والخوف من الفشل", en: "Tension, anxiety, and fear of failure" },
          note: { ar: "الجسم متوتر والأفكار سريعة.", en: "The body feels tense and thoughts are racing." },
          isPrimary: true,
        },
        {
          id: "challenge",
          symbol: "◇",
          name: { ar: "الحماس والتحدي", en: "Excitement and challenge" },
          note: { ar: "قد تبدو اللحظة فرصة للتجربة.", en: "The moment may feel like a chance to try." },
          isPrimary: false,
        },
        {
          id: "indifference",
          symbol: "—",
          name: { ar: "اللامبالاة والملل", en: "Indifference and boredom" },
          note: { ar: "كأن ما سيحدث لا يهم.", en: "As though what happens does not matter." },
          isPrimary: false,
        },
      ],
    },
    behavior: {
      question: { ar: "ماذا يمكن أن تفعل نوفا الآن؟", en: "What could Nova do now?" },
      hint: {
        ar: "كل اختيار يصنع أثراً مختلفاً. لا توجد إجابة مثالية، لكن بعض الخطوات تدعمك أكثر.",
        en: "Every choice creates a different ripple. There is no perfect answer, but some steps support you more.",
      },
      options: [
        {
          id: "avoid-test",
          icon: "avoid",
          tag: { ar: "تجنّب", en: "Avoid" },
          name: { ar: "تترك الورقة فارغة وتنسحب", en: "Leave the paper blank and withdraw" },
          note: {
            ar: "تضع رأسك على الطاولة وتستسلم للشعور بالعجز.",
            en: "Put your head on the desk and give in to helplessness.",
          },
          outcome: {
            eyebrow: { ar: "أثر الاختيار", en: "The ripple effect" },
            title: { ar: "يبقى الضغط ويزداد الندم", en: "The pressure stays and regret grows" },
            body: {
              ar: "بعد الحصة قد يزداد الإحباط وتأنيب الضمير، وتضيع فرصة المحاولة أو الحصول على درجات ممكنة.",
              en: "After class, frustration and guilt may grow, and a chance to try or earn possible marks is lost.",
            },
          },
        },
        {
          id: "anger-test",
          icon: "impulse",
          tag: { ar: "اندفاع", en: "Impulse" },
          name: { ar: "تفرّغ الغضب بتمزيق الورقة أو رمي القلم", en: "Release anger by tearing the paper or throwing a pen" },
          note: {
            ar: "قد يمنحك رد الفعل لحظة قصيرة، لكنه يصعّب الموقف.",
            en: "The reaction may feel brief and powerful, but it makes the situation harder.",
          },
          outcome: {
            eyebrow: { ar: "أثر الاختيار", en: "The ripple effect" },
            title: { ar: "تتعقّد اللحظة من دون حل الاختبار", en: "The moment escalates without solving the test" },
            body: {
              ar: "قد يتحول الأمر إلى مشكلة سلوكية مع المعلمة وإحراج أمام الزملاء، بينما تبقى مشكلة الاختبار نفسها.",
              en: "It can turn into a behavior problem with the teacher and embarrassment in front of classmates, while the test problem remains.",
            },
          },
        },
        {
          id: "regulate-test",
          icon: "regulate",
          tag: { ar: "تنظيم", en: "Regulate" },
          name: { ar: "تتوقف، تتنفس، وتبدأ بالأسهل", en: "Pause, breathe, and start with the easiest" },
          note: {
            ar: "تأخذ نفساً عميقاً ثم تقرأ الأسئلة السهلة أولاً خطوة خطوة.",
            en: "Take a deep breath, then begin with the easier questions one step at a time.",
          },
          outcome: {
            eyebrow: { ar: "أثر الاختيار", en: "The ripple effect" },
            title: { ar: "يعود التركيز خطوة خطوة", en: "Focus returns one step at a time" },
            body: {
              ar: "ينخفض التوتر تدريجياً، ويستعيد العقل قدرته على التركيز، فتنجز نوفا جزءاً جيداً من الاختبار وتشعر بالرضا عن المحاولة.",
              en: "Tension lowers gradually and focus returns. Nova completes a good part of the test and can feel satisfied with trying.",
            },
          },
        },
      ],
    },
    reflectionPrompt: {
      ar: "ما الخطوة الصغيرة التي قد تساعدك في موقف مشابه؟",
      en: "What small step could help you in a similar moment?",
    },
  },
  {
    id: 2,
    internalTitle: {
      ar: "البيئة الرقمية - التنمر الإلكتروني",
      en: "Digital world - cyberbullying",
    },
    mystery: {
      label: { ar: "نبض متقطع", en: "Interrupted pulse" },
      eyebrow: { ar: "وصلت إشارة جديدة", en: "A new signal has arrived" },
      title: { ar: "هناك صدى يقترب من شاشة نوفا", en: "An echo is drawing close to Nova's screen" },
      body: {
        ar: "اقترب بهدوء. يمكنك التوقف أو العودة إلى الخريطة في أي لحظة.",
        en: "Approach calmly. You can pause or return to the map at any time.",
      },
    },
    scene: {
      heading: { ar: "رسالة مؤذية في المجموعة", en: "A hurtful message in the group chat" },
      body: {
        ar: "في غرفتها، تتصفح نوفا هاتفها فتجد صورة أو منشوراً يخصها في مجموعة دردشة مع الأصدقاء، مصحوباً بتعليقات ساخرة ورموز ضاحكة من عدة أشخاص.",
        en: "In her room, Nova scrolls through her phone and finds a photo or post about her in a friends' group chat, with sarcastic comments and laughing emojis from several people.",
      },
    },
    emotion: {
      question: {
        ar: "ما هو الشعور الأقرب لما تمر به الشخصية الآن؟",
        en: "Which feeling is closest to what Nova is going through now?",
      },
      hint: {
        ar: "لاحظ أثر الكلمات على مشاعرها قبل اختيار الشعور الأقرب.",
        en: "Notice how the words affect her before choosing the closest feeling.",
      },
      options: [
        {
          id: "hurt",
          symbol: "◌",
          name: { ar: "الحرج والحزن والخذلان", en: "Embarrassment, sadness, and hurt" },
          note: { ar: "الكلمات الجارحة قد تجعل الشخص يشعر بأنه مستهدف.", en: "Hurtful words can make someone feel targeted." },
          isPrimary: true,
        },
        {
          id: "pride",
          symbol: "◇",
          name: { ar: "الفخر والاهتمام", en: "Pride and attention" },
          note: { ar: "كأن الاهتمام يبدو مريحاً.", en: "As if the attention feels welcome." },
          isPrimary: false,
        },
        {
          id: "calm",
          symbol: "—",
          name: { ar: "الراحة والطمأنينة", en: "Comfort and calm" },
          note: { ar: "كأن الموقف لا يترك أثراً.", en: "As though the moment leaves no impact." },
          isPrimary: false,
        },
      ],
    },
    behavior: {
      question: { ar: "ماذا يمكن أن تفعل نوفا الآن؟", en: "What could Nova do now?" },
      hint: {
        ar: "يمكنك حماية نفسك وطلب الدعم حتى لو كان الموقف مربكاً.",
        en: "You can protect yourself and seek support even when the moment feels confusing.",
      },
      options: [
        {
          id: "reply-in-kind",
          icon: "impulse",
          tag: { ar: "ردّ بالمثل", en: "Reply in kind" },
          name: { ar: "تدخل في جدال حاد وتكتب تعليقات جارحة", en: "Enter a heated argument and write hurtful comments" },
          note: {
            ar: "تحاول أن ترد الألم بألم.",
            en: "Try to answer hurt with more hurt.",
          },
          outcome: {
            eyebrow: { ar: "أثر الاختيار", en: "The ripple effect" },
            title: { ar: "يتصاعد الخلاف ويزداد الاستنزاف", en: "The conflict escalates and becomes more draining" },
            body: {
              ar: "قد تتحول نوفا من متضررة إلى طرف مشارك في الإساءة، ويشتعل الخلاف أكثر ويزداد الاستنزاف النفسي.",
              en: "Nova may shift from being harmed to participating in the harm. The conflict grows and becomes more emotionally draining.",
            },
          },
        },
        {
          id: "isolate-online",
          icon: "avoid",
          tag: { ar: "كبت وعزلة", en: "Hide and isolate" },
          name: { ar: "تغلق الهاتف وتبقى وحدها وتخفي الأمر", en: "Close the phone, stay alone, and hide it" },
          note: {
            ar: "تعتقد أنها تستحق السخرية ولا تخبر أحداً.",
            en: "Believe the mockery is deserved and tell no one.",
          },
          outcome: {
            eyebrow: { ar: "أثر الاختيار", en: "The ripple effect" },
            title: { ar: "يتراكم الحزن ويبقى الأذى بلا توقف", en: "Sadness builds while the harm continues" },
            body: {
              ar: "قد يتراكم الحزن ويؤثر في الثقة بالنفس والنوم، وقد يستمر المتنمرون في تصرفاتهم دون رادع.",
              en: "Sadness can build and affect confidence and sleep, while the people causing harm may continue unchecked.",
            },
          },
        },
        {
          id: "protect-online",
          icon: "regulate",
          tag: { ar: "حماية ودعم", en: "Protect and seek support" },
          name: { ar: "توثّق الموقف وتطلب الدعم", en: "Document the moment and ask for support" },
          note: {
            ar: "تلتقط صورة للشاشة، تحظر المسيئين أو تغادر المجموعة، ثم تتحدث مع بالغ موثوق.",
            en: "Take a screenshot, block the people causing harm or leave the group, then speak with a trusted adult.",
          },
          outcome: {
            eyebrow: { ar: "أثر الاختيار", en: "The ripple effect" },
            title: { ar: "تستعيد نوفا الأمان والدعم", en: "Nova regains safety and support" },
            body: {
              ar: "يتم التعامل مع الموقف بحكمة لحمايتها ووقف الإساءة، فتشعر نوفا بالأمان والدعم.",
              en: "The situation can be handled wisely to protect her and help stop the harm, so Nova feels safer and supported.",
            },
          },
        },
      ],
    },
    reflectionPrompt: {
      ar: "من الشخص الآمن الذي يمكن أن تتحدث معه إذا حدث موقف مشابه؟",
      en: "Who is one safe person you could talk to if something similar happened?",
    },
  },
  {
    id: 3,
    internalTitle: {
      ar: "البيئة الأسرية - سوء الفهم والشعور بالظلم",
      en: "Family environment - misunderstanding and unfairness",
    },
    mystery: {
      label: { ar: "تيار مضطرب", en: "Troubled current" },
      eyebrow: { ar: "وصلت إشارة جديدة", en: "A new signal has arrived" },
      title: { ar: "هناك موجة مشاعر داخل منزل نوفا", en: "A wave of feelings is rising in Nova's home" },
      body: {
        ar: "اقترب بهدوء. يمكنك التوقف أو العودة إلى الخريطة في أي لحظة.",
        en: "Approach calmly. You can pause or return to the map at any time.",
      },
    },
    scene: {
      heading: { ar: "لوم قبل سماع الحقيقة", en: "Being blamed before being heard" },
      body: {
        ar: "في المنزل، يتعرض غرض مفضل لأحد أفراد الأسرة للكسر بالخطأ. يدخل ولي الأمر ويظن فوراً أن نوفا هي السبب، ويبدأ بتوبيخها من دون أن يسمع التفاصيل.",
        en: "At home, a favourite item belonging to a family member is accidentally broken. A guardian comes in, immediately assumes Nova caused it, and starts scolding before hearing the details.",
      },
    },
    emotion: {
      question: {
        ar: "ماذا تشعر الشخصية تجاه هذا الموقف؟",
        en: "How might Nova feel about this situation?",
      },
      hint: {
        ar: "فكّر في معنى أن يُحكم عليك قبل أن يُسمع جانبك.",
        en: "Think about what it means to be judged before your side is heard.",
      },
      options: [
        {
          id: "injustice",
          symbol: "!",
          name: { ar: "الغضب والشعور بالظلم وعدم الإنصاف", en: "Anger, unfairness, and feeling unheard" },
          note: { ar: "تحتاج المشاعر إلى مساحة آمنة للتعبير.", en: "These feelings need a safe space for expression." },
          isPrimary: true,
        },
        {
          id: "gratitude",
          symbol: "◇",
          name: { ar: "السعادة والامتنان", en: "Happiness and gratitude" },
          note: { ar: "كأن الموقف مريح ومقبول.", en: "As though the situation feels comfortable and welcome." },
          isPrimary: false,
        },
        {
          id: "success-shame",
          symbol: "—",
          name: { ar: "الخجل من النجاح", en: "Embarrassment about success" },
          note: { ar: "شعور لا يرتبط بما حدث هنا.", en: "A feeling that does not fit what happened here." },
          isPrimary: false,
        },
      ],
    },
    behavior: {
      question: { ar: "ماذا يمكن أن تفعل نوفا الآن؟", en: "What could Nova do now?" },
      hint: {
        ar: "ليس عليك تجاهل الغضب؛ يمكنك اختيار طريقة آمنة وواضحة للتعبير عنه.",
        en: "You do not have to ignore anger; you can choose a safe and clear way to express it.",
      },
      options: [
        {
          id: "shout-home",
          icon: "impulse",
          tag: { ar: "انفعال", en: "React" },
          name: { ar: "تصرخ وتغلق باب الغرفة بقوة", en: "Shout and slam the bedroom door" },
          note: {
            ar: "ترفض الحديث تماماً في لحظة الغضب.",
            en: "Refuse to talk at all in the heat of anger.",
          },
          outcome: {
            eyebrow: { ar: "أثر الاختيار", en: "The ripple effect" },
            title: { ar: "يضيع معنى الموقف وسط رد الفعل", en: "The real issue gets lost in the reaction" },
            body: {
              ar: "قد يركز ولي الأمر على أسلوب الرد غير اللائق بدلاً من سماع الحقيقة، ويستمر التوتر في المنزل.",
              en: "A guardian may focus on the reaction rather than hearing the truth, and tension at home can continue.",
            },
          },
        },
        {
          id: "silent-home",
          icon: "avoid",
          tag: { ar: "انسحاب صامت", en: "Silent withdrawal" },
          name: { ar: "تقبل اللوم بصمت وتحتفظ بالغضب", en: "Accept the blame silently and hold onto the anger" },
          note: {
            ar: "تنسحب من الحديث مع بقاء الضيق في الداخل.",
            en: "Withdraw from the conversation while the hurt stays inside.",
          },
          outcome: {
            eyebrow: { ar: "أثر الاختيار", en: "The ripple effect" },
            title: { ar: "يبقى سوء الفهم والضغط الداخلي", en: "The misunderstanding and inner pressure remain" },
            body: {
              ar: "يستمر سوء الفهم من دون تصحيح، ويزداد الشعور بالبعد العاطفي والضغط الداخلي خلال الأيام التالية.",
              en: "The misunderstanding remains uncorrected, and feelings of emotional distance and inner pressure can grow over the following days.",
            },
          },
        },
        {
          id: "calm-home",
          icon: "regulate",
          tag: { ar: "تواصل هادئ", en: "Calm communication" },
          name: { ar: "تنتظر لحظة ثم تشرح بهدوء ووضوح", en: "Pause briefly, then explain calmly and clearly" },
          note: {
            ar: "توضح ما حدث وتشرح مشاعرك بصدق واحترام.",
            en: "Explain what happened and share your feelings honestly and respectfully.",
          },
          outcome: {
            eyebrow: { ar: "أثر الاختيار", en: "The ripple effect" },
            title: { ar: "يُسمع جانب نوفا ويبدأ الفهم", en: "Nova is heard and understanding can begin" },
            body: {
              ar: "يستمع ولي الأمر لوجهة نظرها، ويتضح سوء الفهم، وتتعزز مهارة التعبير الصحي عن الذات وحل الخلافات.",
              en: "The guardian hears Nova's perspective, the misunderstanding becomes clearer, and healthy self-expression and conflict resolution are strengthened.",
            },
          },
        },
      ],
    },
    reflectionPrompt: {
      ar: "كيف يمكنك أن تشرح ما تشعر به باحترام عندما تحتاج أن يُسمع جانبك؟",
      en: "How could you explain your feelings respectfully when you need your side to be heard?",
    },
  },
];

export const coreScenarioIds = scenarioContents.map((scenario) => scenario.id);

export const scenarioContent = Object.fromEntries(
  scenarioContents.map((scenario) => [scenario.id, scenario]),
) as Record<number, ScenarioContent>;

export const scenarioContentById = scenarioContent;
