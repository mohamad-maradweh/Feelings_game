import { useEffect, useMemo, useRef, useState } from "react";
import {
  coreScenarioIds,
  scenarioContent,
  scenarioContents,
  type ScenarioContent,
} from "./content/scenarios";

type Language = "ar" | "en";

type TextScale = "small" | "default" | "large" | "xlarge";
type ColorVision = "default" | "protanopia" | "deuteranopia" | "tritanopia";

type AccessibilitySettings = {
  textScale: TextScale;
  colorVision: ColorVision;
  highContrast: boolean;
  reduceMotion: boolean;
  captions: boolean;
  focusHighlight: boolean;
};

type Screen =
  | "splash"
  | "landing"
  | "map"
  | "mystery"
  | "scene"
  | "emotion"
  | "behavior"
  | "outcome"
  | "closure"
  | "calm"
  | "support"
  | "guardian"
  | "foundations"
  | "admin-library"
  | "admin-builder"
  | "admin-review";

type IconName =
  | "accessibility"
  | "help"
  | "compass"
  | "spark"
  | "arrow"
  | "pause"
  | "heart"
  | "home"
  | "school"
  | "person"
  | "search"
  | "plus"
  | "check"
  | "layers"
  | "eye"
  | "send"
  | "close"
  | "menu"
  | "zoom";

const screenMeta: Array<{ id: Screen; label: string; group: string }> = [
  { id: "splash", label: "شاشة البداية", group: "اللاعب" },
  { id: "landing", label: "الرئيسية", group: "اللاعب" },
  { id: "map", label: "خريطة العالم", group: "اللاعب" },
  { id: "mystery", label: "الإشارة الغامضة", group: "الرحلة" },
  { id: "scene", label: "اكتشاف الموقف", group: "الرحلة" },
  { id: "emotion", label: "سؤال الشعور", group: "الرحلة" },
  { id: "behavior", label: "اختيار التصرف", group: "الرحلة" },
  { id: "outcome", label: "النتيجة والتأمل", group: "الرحلة" },
  { id: "closure", label: "رسالة الختام", group: "الرحلة" },
  { id: "calm", label: "مرسى الهدوء", group: "الدعم" },
  { id: "support", label: "طلب المساعدة", group: "الدعم" },
  { id: "guardian", label: "التحدث مع ولي الأمر", group: "الدعم" },
  { id: "foundations", label: "التأسيسات والمكوّنات", group: "النظام" },
  { id: "admin-library", label: "مكتبة السيناريوهات", group: "الإدارة" },
  { id: "admin-builder", label: "منشئ السيناريو", group: "الإدارة" },
  { id: "admin-review", label: "المراجعة والنشر", group: "الإدارة" },
];

const art: Partial<Record<Screen, string>> = {
  splash: "/assets/splash-art.jpg",
  landing: "/assets/landing-clean.jpg",
  mystery: "/assets/mystery-art.jpg",
  scene: "/assets/scene-art.jpg",
  emotion: "/assets/emotion-art.jpg",
  behavior: "/assets/behavior-art.jpg",
  outcome: "/assets/outcome-art.jpg",
  closure: "/assets/outcome-art.jpg",
  calm: "/assets/quiet-sanctuary.jpg",
  support: "/assets/quiet-sanctuary.jpg",
  guardian: "/assets/guardian-art.jpg",
};

function Icon({ name, size = 22 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    accessibility: (
      <>
        <circle cx="12" cy="4" r="2" />
        <path d="M5 8h14M12 8v12M8 20l4-7 4 7" />
      </>
    ),
    help: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9.8 9a2.4 2.4 0 1 1 3.2 2.3c-1 .4-1 1.2-1 2M12 17h.01" />
      </>
    ),
    compass: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m15.5 8.5-2 5-5 2 2-5z" />
      </>
    ),
    spark: (
      <>
        <path d="m12 2 1.5 6.5L20 10l-6.5 1.5L12 18l-1.5-6.5L4 10l6.5-1.5z" />
      </>
    ),
    arrow: (
      <>
        <path d="M19 12H5M11 18l-6-6 6-6" />
      </>
    ),
    pause: (
      <>
        <path d="M8 5v14M16 5v14" />
      </>
    ),
    heart: <path d="M20 8c0 5-8 10-8 10S4 13 4 8a4 4 0 0 1 7-2.6L12 6.5l1-1.1A4 4 0 0 1 20 8Z" />,
    home: (
      <>
        <path d="m3 11 9-7 9 7" />
        <path d="M5 10v10h14V10M9 20v-6h6v6" />
      </>
    ),
    school: (
      <>
        <path d="M4 21h16M6 21V9h12v12M9 13h2M13 13h2M9 17h2M13 17h2" />
        <path d="M12 9V3l5 2-5 2" />
      </>
    ),
    person: (
      <>
        <circle cx="12" cy="7" r="3" />
        <path d="M5 21c0-4 3-7 7-7s7 3 7 7" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    check: <path d="m5 12 4 4L19 6" />,
    layers: (
      <>
        <path d="m12 3 9 5-9 5-9-5z" />
        <path d="m3 12 9 5 9-5M3 16l9 5 9-5" />
      </>
    ),
    eye: (
      <>
        <path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12Z" />
        <circle cx="12" cy="12" r="2.5" />
      </>
    ),
    send: (
      <>
        <path d="m22 2-7 20-4-9-9-4zM11 13 22 2" />
      </>
    ),
    close: <path d="m6 6 12 12M18 6 6 18" />,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    zoom: (
      <>
        <circle cx="10" cy="10" r="6" />
        <path d="m15 15 5 5M10 7v6M7 10h6" />
      </>
    ),
  };
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

function Button({
  children,
  onClick,
  secondary = false,
  icon,
  disabled = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  icon?: IconName;
  disabled?: boolean;
}) {
  return (
    <button
      className={`cta ${secondary ? "cta-secondary" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
      {icon && <Icon name={icon} />}
    </button>
  );
}

function PlayerHeader({
  screen,
  setScreen,
  language,
  setLanguage,
  accessibility,
  setAccessibility,
  onGuide,
}: {
  screen: Screen;
  setScreen: (s: Screen) => void;
  language: Language;
  setLanguage: (v: Language) => void;
  accessibility: AccessibilitySettings;
  setAccessibility: (v: AccessibilitySettings) => void;
  onGuide?: () => void;
}) {
  const english = language === "en";
  const [accessOpen, setAccessOpen] = useState(false);
  const textSizes: Array<{ value: TextScale; en: string; ar: string }> = [
    { value: "small", en: "Small", ar: "صغير" },
    { value: "default", en: "Default", ar: "افتراضي" },
    { value: "large", en: "Large", ar: "كبير" },
    { value: "xlarge", en: "Extra large", ar: "كبير جداً" },
  ];
  const colorModes: Array<{ value: ColorVision; en: string; ar: string }> = [
    { value: "default", en: "Default", ar: "الافتراضي" },
    { value: "protanopia", en: "Protanopia", ar: "بروتانوبيا" },
    { value: "deuteranopia", en: "Deuteranopia", ar: "ديوترانوبيا" },
    { value: "tritanopia", en: "Tritanopia", ar: "تريتانوبيا" },
  ];
  const updateAccess = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K],
  ) => setAccessibility({ ...accessibility, [key]: value });
  return (
    <header
      className={`player-header ${english ? "is-ltr" : "is-rtl"}`}
      dir={english ? "ltr" : "rtl"}
    >
      <button
        className="wordmark"
        onClick={() => setScreen("landing")}
        aria-label={english ? "Home" : "الرئيسية"}
      >
        <span>FEELINGS</span>
        <i />
      </button>
      <nav aria-label={english ? "Player tools" : "أدوات اللاعب"}>
        <button className="nav-text" onClick={onGuide || (() => setScreen("foundations"))}>
          {english ? "Guide" : "الدليل"}
        </button>
        <button
          className={`icon-button access-trigger ${accessOpen ? "active" : ""}`}
          aria-label={english ? "Accessibility settings" : "إعدادات الإتاحة"}
          aria-expanded={accessOpen}
          onClick={() => setAccessOpen(!accessOpen)}
        >
          <Icon name="accessibility" />
          <small>{english ? "Accessibility" : "الإتاحة"}</small>
        </button>
        <button
          className="language"
          dir="ltr"
          onClick={() => setLanguage(english ? "ar" : "en")}
          aria-label={english ? "Switch to Arabic" : "التبديل إلى الإنجليزية"}
        >
          <b>{english ? "English" : "العربية"}</b> <span>/</span> {english ? "العربية" : "English"}
        </button>
      </nav>
      {accessOpen && (
        <section className="accessibility-panel glass-panel" dir={english ? "ltr" : "rtl"}>
          <div className="access-panel-head">
            <div>
              <small>{english ? "DISPLAY & MOTION" : "العرض والحركة"}</small>
              <strong>{english ? "Accessibility" : "الإتاحة"}</strong>
            </div>
            <button onClick={() => setAccessOpen(false)} aria-label={english ? "Close" : "إغلاق"}>
              <Icon name="close" size={18} />
            </button>
          </div>
          <div className="text-size-control">
            <span>{english ? "Text size" : "حجم النص"}</span>
            <div>
              {textSizes.map((size) => (
                <button
                  className={accessibility.textScale === size.value ? "active" : ""}
                  onClick={() => updateAccess("textScale", size.value)}
                  key={size.value}
                  aria-pressed={accessibility.textScale === size.value}
                >
                  {english ? size.en : size.ar}
                </button>
              ))}
            </div>
          </div>
          <div className="color-vision-control">
            <span>{english ? "Colour vision" : "تمييز الألوان"}</span>
            <div>
              {colorModes.map((mode) => (
                <button
                  className={accessibility.colorVision === mode.value ? "active" : ""}
                  onClick={() => updateAccess("colorVision", mode.value)}
                  key={mode.value}
                  aria-pressed={accessibility.colorVision === mode.value}
                >
                  {english ? mode.en : mode.ar}
                </button>
              ))}
            </div>
          </div>
          {[
            ["highContrast", english ? "High contrast" : "تباين عالٍ"],
            ["reduceMotion", english ? "Reduce motion" : "تقليل الحركة"],
            ["captions", english ? "Captions" : "النصوص المصاحبة"],
            ["focusHighlight", english ? "Focus highlight" : "تمييز التركيز"],
          ].map(([key, label]) => {
            const setting = key as Exclude<keyof AccessibilitySettings, "textScale">;
            return (
              <button
                className="access-toggle"
                onClick={() => updateAccess(setting, !accessibility[setting])}
                key={key}
              >
                <span>{label}</span>
                <i className={accessibility[setting] ? "on" : ""}>
                  <b />
                </i>
              </button>
            );
          })}
        </section>
      )}
    </header>
  );
}

function Ocean({
  screen,
  children,
  setScreen,
  reduced,
  language,
  setLanguage,
  accessibility,
  setAccessibility,
  onGuide,
  arriving = false,
  bare = false,
}: {
  screen: Screen;
  children: React.ReactNode;
  setScreen: (s: Screen) => void;
  reduced: boolean;
  language: Language;
  setLanguage: (v: Language) => void;
  accessibility: AccessibilitySettings;
  setAccessibility: (v: AccessibilitySettings) => void;
  onGuide?: () => void;
  arriving?: boolean;
  bare?: boolean;
}) {
  return (
    <main
      className={`ocean-screen screen-${screen} ${reduced ? "reduced" : ""} ${arriving ? "intro-arrival" : ""}`}
      style={{ "--art": `url(${art[screen]})` } as React.CSSProperties}
    >
      <div className="art-layer" />
      <div className="depth-layer" />
      <div className="rays" />
      <div className="particles">
        {Array.from({ length: 12 }, (_, i) => (
          <i key={i} />
        ))}
      </div>
      {!bare && (
        <PlayerHeader
          {...{
            screen,
            setScreen,
            language,
            setLanguage,
            accessibility,
            setAccessibility,
            onGuide,
          }}
        />
      )}
      {screen !== "map" && (
        <button className="support-fab" onClick={() => setScreen("calm")}>
          <Icon name="help" />
          <span>{language === "en" ? "Quiet Space" : "مساحة هادئة"}</span>
        </button>
      )}
      {children}
    </main>
  );
}

function Splash({ onComplete, reduced }: { onComplete: () => void; reduced: boolean }) {
  const completed = useRef(false);
  const finish = () => {
    if (completed.current) return;
    completed.current = true;
    onComplete();
  };
  useEffect(() => {
    const timer = window.setTimeout(finish, 3000);
    return () => window.clearTimeout(timer);
  }, []);
  return (
    <main
      className={`ocean-screen screen-splash ${reduced ? "reduced-splash" : ""}`}
      onClick={finish}
      onKeyDown={(event) => (event.key === "Enter" || event.key === " ") && finish()}
      role="button"
      tabIndex={0}
      aria-label="Skip introduction"
    >
      <div className="splash-caustics" />
      <div className="splash-rays" />
      <div className="splash-particles">
        {Array.from({ length: 18 }, (_, index) => (
          <i key={index} />
        ))}
      </div>
      <div className="splash-current" />
      <img className="splash-ruwwad" src="/assets/ruwwad.png" alt="روّاد التنمية" />
    </main>
  );
}

const guideSteps = {
  ar: [
    "اكتشف إشارة غامضة",
    "شاهد ما يحدث في المشهد",
    "سمِّ الشعور الأقرب للحظة",
    "اختر تصرّفاً وشاهد أثره",
    "خذ فكرة مفيدة أو اطلب دعماً عند الحاجة",
  ],
  en: [
    "Discover a mystery signal",
    "Watch what happens in the scene",
    "Name the emotion closest to the moment",
    "Choose an action and see its impact",
    "Take a useful idea or ask for support",
  ],
};

function Landing({
  setScreen,
  language,
  guideOpen,
  setGuideOpen,
}: {
  setScreen: (s: Screen) => void;
  language: Language;
  guideOpen: boolean;
  setGuideOpen: (v: boolean) => void;
}) {
  const english = language === "en";
  return (
    <section className="landing-layout" dir={english ? "ltr" : "rtl"}>
      <div className="landing-copy">
        <h1>FEELINGS</h1>
        <h2>
          {english ? "Discover your emotions." : "اكتشف مشاعرك."}
          <br />
          <em>{english ? "Discover your choices." : "واكتشف خياراتك."}</em>
        </h2>
        <p>
          {english
            ? "Enter an underwater world where every situation is a new opportunity to understand yourself and what might help in the next moment."
            : "ادخل عالماً تحت الماء، حيث كل موقف فرصة جديدة لفهم نفسك وما قد يساعدك في اللحظة التالية."}
        </p>
        <div className="actions">
          <Button onClick={() => setScreen("map")} icon="arrow">
            {english ? "Start the adventure" : "ابدأ المغامرة"}
          </Button>
          <Button onClick={() => setGuideOpen(true)} secondary icon="compass">
            {english ? "How to play" : "كيف ألعب؟"}
          </Button>
        </div>
      </div>
      <footer className="landing-footer">
        <span>
          {english
            ? "A safe space to explore at your own pace."
            : "مساحة آمنة للاستكشاف على وتيرتك."}
        </span>
        <i />
        <span>{english ? "You can leave at any time." : "يمكنك المغادرة في أي وقت."}</span>
      </footer>
      {guideOpen && (
        <div className="guide-backdrop" role="dialog" aria-modal="true">
          <section className="guide-overlay glass-panel" dir={english ? "ltr" : "rtl"}>
            <button
              className="guide-close"
              onClick={() => setGuideOpen(false)}
              aria-label={english ? "Close" : "إغلاق"}
            >
              <Icon name="close" />
            </button>
            <span className="guide-kicker">{english ? "YOUR JOURNEY" : "رحلتك في الأعماق"}</span>
            <h2>{english ? "How to play" : "كيف ألعب؟"}</h2>
            <ol>
              {guideSteps[language].map((step, index) => (
                <li key={step}>
                  <i>{index + 1}</i>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <p>
              {english
                ? "You can return to the map or ask for support at any time."
                : "يمكنك العودة للخريطة أو طلب الدعم في أي وقت."}
            </p>
            <Button onClick={() => setGuideOpen(false)}>{english ? "Got it" : "فهمت"}</Button>
          </section>
        </div>
      )}
    </section>
  );
}

type MapSignal = {
  id: number;
  label: number;
  duration: number;
  state: "available" | "started" | "complete";
  region: number;
};

type ScenarioStatus = "draft" | "review" | "published" | "archived";

type Scenario = MapSignal & {
  internalTitle: string;
  status: ScenarioStatus;
  mysteryHint?: string;
  mysteryHintEn?: string;
  summary?: string;
};

type ScenarioDraft = {
  internalTitle: string;
  mysteryHint: string;
  summary: string;
  region: number;
};

const mysteryLabels = {
  ar: ["إشارة غامضة", "ضوء متردد", "صدى بعيد", "تيار متقطع"],
  en: ["Mystery signal", "Flickering light", "Distant echo", "Broken current"],
};

const mapRegions = [
  { id: 0, ar: "المدرسة", en: "School" },
  { id: 1, ar: "المنزل", en: "Home" },
  { id: 2, ar: "العالم الرقمي", en: "Digital" },
  { id: 3, ar: "العائلة", en: "Family" },
  { id: 4, ar: "المجتمع", en: "Social" },
];

const scenarioStatusLabels: Record<ScenarioStatus, string> = {
  draft: "مسودة",
  review: "قيد المراجعة",
  published: "منشور",
  archived: "مؤرشف",
};

const initialScenarios: Scenario[] = scenarioContents.map((content, index) => ({
  id: content.id,
  internalTitle: content.internalTitle.ar,
  label: index % mysteryLabels.ar.length,
  mysteryHint: content.mystery.label.ar,
  mysteryHintEn: content.mystery.label.en,
  summary: content.scene.body.ar,
  duration: [6, 7, 6][index] ?? 6,
  state: "available",
  region: [0, 2, 1][index] ?? 0,
  status: "published",
}));

const createScenarioDraft = (): ScenarioDraft => ({
  internalTitle: "اختبار مفاجئ في المدرسة",
  mysteryHint: "إشارة غامضة",
  summary: "بريق خافت يصل من ممر بعيد...",
  region: 0,
});

function buildRouteLayout(count: number, height: number) {
  const cycles = Math.max(4, Math.ceil(count / 9));
  const point = (t: number) => ({
    x: 500 + 270 * Math.sin(t * Math.PI * cycles - Math.PI / 2),
    y: 90 + t * (height - 180),
  });
  const samples = Array.from({ length: 801 }, (_, index) => point(index / 800));
  const lengths = [0];
  for (let index = 1; index < samples.length; index += 1) {
    const dx = samples[index].x - samples[index - 1].x;
    const dy = samples[index].y - samples[index - 1].y;
    lengths.push(lengths[index - 1] + Math.hypot(dx, dy));
  }
  const total = lengths[lengths.length - 1];
  const markers = Array.from({ length: count }, (_, markerIndex) => {
    const target = (total * (markerIndex + 1)) / (count + 1);
    let sampleIndex = lengths.findIndex((length) => length >= target);
    if (sampleIndex < 1) sampleIndex = 1;
    const before = lengths[sampleIndex - 1];
    const ratio = (target - before) / Math.max(1, lengths[sampleIndex] - before);
    return {
      x: samples[sampleIndex - 1].x + (samples[sampleIndex].x - samples[sampleIndex - 1].x) * ratio,
      y: samples[sampleIndex - 1].y + (samples[sampleIndex].y - samples[sampleIndex - 1].y) * ratio,
    };
  });
  return {
    cycles,
    markers,
    path: samples
      .filter((_, index) => index % 4 === 0)
      .map((sample, index) => `${index ? "L" : "M"}${sample.x.toFixed(1)} ${sample.y.toFixed(1)}`)
      .join(" "),
  };
}

function MapScreen({
  setScreen,
  language,
  scenarios,
  onStartScenario,
  canFinishJourney,
}: {
  setScreen: (s: Screen) => void;
  language: Language;
  scenarios: Scenario[];
  onStartScenario: (id: number) => void;
  canFinishJourney: boolean;
}) {
  const english = language === "en";
  const viewportRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, y: 0, scroll: 0 });
  const progressFrame = useRef<number | null>(null);
  const publishedSignals = useMemo(
    () => scenarios.filter((scenario) => scenario.status === "published"),
    [scenarios],
  );
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const [progress, setProgress] = useState(0);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState<number | null>(null);
  const signalLabel = (signal: Pick<Scenario, "label" | "mysteryHint" | "mysteryHintEn">) =>
    language === "en"
      ? signal.mysteryHintEn?.trim() || mysteryLabels.en[signal.label]
      : signal.mysteryHint?.trim() || mysteryLabels.ar[signal.label];
  const canvasHeight = Math.max(2800, (publishedSignals.length + 1) * 180);
  const route = useMemo(
    () => buildRouteLayout(publishedSignals.length, canvasHeight),
    [canvasHeight, publishedSignals.length],
  );
  const visibleSignals = useMemo(
    () =>
      publishedSignals
        .map((signal, index) => ({ ...signal, ...route.markers[index] }))
        .filter((signal) => {
          const matchesRegion = region === null || signal.region === region;
          const label = signalLabel(signal).toLowerCase();
          return matchesRegion && label.includes(search.toLowerCase());
        }),
    [language, publishedSignals, region, route.markers, search],
  );
  const selected = useMemo(
    () => publishedSignals.find((signal) => signal.id === selectedId) ?? null,
    [publishedSignals, selectedId],
  );
  useEffect(() => {
    setSelectedId((current) => current ?? publishedSignals[0]?.id ?? null);
  }, [publishedSignals]);
  useEffect(() => {
    setSelectedId((current) =>
      current !== null && !visibleSignals.some((signal) => signal.id === current) ? null : current,
    );
  }, [visibleSignals]);
  useEffect(
    () => () => {
      if (progressFrame.current !== null) window.cancelAnimationFrame(progressFrame.current);
    },
    [],
  );
  const miniRoute = useMemo(
    () =>
      Array.from({ length: 81 }, (_, index) => {
        const t = index / 80;
        const x = 21 + 14 * Math.sin(t * Math.PI * route.cycles - Math.PI / 2);
        const y = 8 + t * 132;
        return `${index ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
      }).join(" "),
    [route.cycles],
  );
  const miniOrb = {
    x: 21 + 14 * Math.sin(progress * Math.PI * route.cycles - Math.PI / 2),
    y: 8 + progress * 132,
  };
  const updateProgress = () => {
    if (progressFrame.current !== null) return;
    progressFrame.current = window.requestAnimationFrame(() => {
      const node = viewportRef.current;
      if (node) setProgress(node.scrollTop / Math.max(1, node.scrollHeight - node.clientHeight));
      progressFrame.current = null;
    });
  };
  const zoomBy = (delta: number) =>
    setZoom((value) => Math.min(1.35, Math.max(0.72, +(value + delta).toFixed(2))));
  const resetMap = () => {
    setZoom(1);
    viewportRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };
  const pointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest("button")) return;
    const node = viewportRef.current;
    if (!node) return;
    drag.current = { active: true, y: event.clientY, scroll: node.scrollTop };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const pointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active || !viewportRef.current) return;
    viewportRef.current.scrollTop = drag.current.scroll + drag.current.y - event.clientY;
  };
  const pointerUp = () => {
    drag.current.active = false;
  };
  return (
    <section className={`map-layout map-lang-${language}`} dir={english ? "ltr" : "rtl"}>
      <div className="map-toolbar glass-panel">
        <label>
          <Icon name="search" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={english ? "Search mystery signals" : "ابحث عن إشارة غامضة"}
          />
        </label>
        <div className="filter-row">
          {[{ id: null, ar: "الكل", en: "All" }, ...mapRegions].map((item) => (
            <button
              key={item.id ?? "all"}
              className={region === item.id ? "active" : ""}
              onClick={() => setRegion(item.id)}
            >
              {english ? item.en : item.ar}
            </button>
          ))}
        </div>
        <button
          className="map-quiet-link"
          onClick={() => setScreen("calm")}
          aria-label={english ? "Open Quiet Space" : "افتح مساحة هادئة"}
        >
          <Icon name="heart" size={18} />
        </button>
      </div>
      <div
        ref={viewportRef}
        className="map-viewport"
        onScroll={updateProgress}
        onPointerDown={pointerDown}
        onPointerMove={pointerMove}
        onPointerUp={pointerUp}
        onPointerCancel={pointerUp}
      >
        <div className="map-scale-space" style={{ height: `${canvasHeight * zoom}px` }}>
          <div
            className="map-canvas"
            style={{ transform: `scale(${zoom})`, height: `${canvasHeight}px` }}
          >
            <svg
              className="s-current"
              viewBox={`0 0 1000 ${canvasHeight}`}
              preserveAspectRatio="none"
            >
              <defs>
                <filter id="current-glow">
                  <feGaussianBlur stdDeviation="12" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id="current-color" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#95fffb" />
                  <stop offset=".5" stopColor="#26c6c7" />
                  <stop offset="1" stopColor="#8a65cb" />
                </linearGradient>
              </defs>
              <path className="current-haze" d={route.path} />
              <path className="current-core" d={route.path} />
              <g className="branch-lines">
                {[0.24, 0.5, 0.76].map((position, index) => {
                  const anchor = route.markers[Math.floor(position * route.markers.length)];
                  if (!anchor) return null;
                  const endX = index % 2 ? 900 : 100;
                  return (
                    <path
                      key={position}
                      d={`M${anchor.x} ${anchor.y} Q${index % 2 ? 820 : 180} ${anchor.y + 90} ${endX} ${anchor.y + 210}`}
                    />
                  );
                })}
              </g>
            </svg>
            <div className="canvas-depth-label">
              <span>{english ? "THE LUMINOUS DEPTHS" : "الأعماق المضيئة"}</span>
              <small>{english ? "Drag or scroll to explore" : "اسحب أو مرّر للاستكشاف"}</small>
            </div>
            {visibleSignals.map((signal) => (
              <button
                key={signal.id}
                className={`map-signal ${signal.state} ${selected?.id === signal.id ? "selected" : ""}`}
                style={{ left: `${signal.x / 10}%`, top: `${signal.y}px` }}
                onClick={() => setSelectedId(signal.id)}
                aria-label={`${signalLabel(signal)}, ${signal.duration} ${english ? "minutes" : "دقائق"}`}
              >
                <span className="signal-ring" />
                <Icon
                  name={
                    signal.state === "complete"
                      ? "check"
                      : signal.state === "started"
                        ? "layers"
                        : "spark"
                  }
                  size={20}
                />
                <small>{signal.duration}</small>
              </button>
            ))}
          </div>
        </div>
      </div>
      {selected && (
        <aside className="map-panel glass-panel">
          <button className="panel-close" onClick={() => setSelectedId(null)}>
            <Icon name="close" size={18} />
          </button>
          <div className="panel-kicker">
            <span className="pulse-dot" />{" "}
            {selected.state === "available"
              ? english
                ? "Available now"
                : "متاحة الآن"
              : selected.state === "complete"
                ? english
                  ? "Explored"
                  : "تم استكشافها"
                : english
                  ? "In progress"
                  : "قيد الاستكشاف"}
          </div>
          <h2>{signalLabel(selected)}</h2>
          <div className="signal-meta">
            <span>
              {selected.duration} {english ? "min" : "دقائق"}
            </span>
            <i />
            <span>{english ? "Private progress" : "تقدّم خاص بك"}</span>
          </div>
          <p>{english ? "Would you like to explore this signal?" : "هل تريد اكتشاف الإشارة؟"}</p>
          <small>
            <Icon name="heart" size={15} />{" "}
            {english ? "You can leave at any time." : "يمكنك المغادرة في أي وقت."}
          </small>
          <Button
            onClick={() => onStartScenario(selected.id)}
            icon="arrow"
            disabled={!scenarioContent[selected.id]}
          >
            {scenarioContent[selected.id]
              ? english
                ? "Explore situation"
                : "اكتشف الموقف"
              : english
                ? "Content being prepared"
                : "المحتوى قيد التجهيز"}
          </Button>
        </aside>
      )}
      {canFinishJourney && (
        <button className="map-completion-cta" onClick={() => setScreen("closure")}>
          <Icon name="spark" size={18} />
          <span>{english ? "Finish your journey" : "أكمل رحلتك"}</span>
        </button>
      )}
      <div className="map-controls">
        <button onClick={() => zoomBy(0.12)} aria-label={english ? "Zoom in" : "تكبير"}>
          <Icon name="plus" />
        </button>
        <button onClick={() => zoomBy(-0.12)} aria-label={english ? "Zoom out" : "تصغير"}>
          <span className="minus">−</span>
        </button>
        <button onClick={resetMap} aria-label={english ? "Reset map" : "إعادة ضبط الخريطة"}>
          <Icon name="compass" />
        </button>
        <span>{Math.round(zoom * 100)}%</span>
      </div>
      <div className="map-minimap" aria-label={english ? "Current location" : "موقعك الحالي"}>
        <span>{english ? "Current location" : "موقعك الحالي"}</span>
        <svg viewBox="0 0 42 150">
          <path d={miniRoute} />
          <circle className="navigator-orb" cx={miniOrb.x} cy={miniOrb.y} r="4" />
        </svg>
      </div>
      <div className="mobile-map-hint">
        <Icon name="zoom" size={17} />
        {english ? "Drag vertically · Use controls to zoom" : "اسحب عمودياً · استخدم أدوات التكبير"}
      </div>
    </section>
  );
}

function JourneyTitle({ step, title }: { step: string; title: string }) {
  return (
    <div className="journey-title">
      <span>{step}</span>
      <h1>{title}</h1>
    </div>
  );
}

function Mystery({
  setScreen,
  language,
  scenario,
}: {
  setScreen: (s: Screen) => void;
  language: Language;
  scenario: ScenarioContent;
}) {
  const english = language === "en";
  return (
    <section className="journey-centered">
      <JourneyTitle
        step={english ? "STEP 01" : "المحطة 01"}
        title={english ? "Mystery signal" : "إشارة غامضة"}
      />
      <div className="mystery-card glass-panel">
        <span className="mystery-mark">؟</span>
        <div>
          <div className="eyebrow">{scenario.mystery.eyebrow[language]}</div>
          <h2>{scenario.mystery.title[language]}</h2>
          <p>{scenario.mystery.body[language]}</p>
        </div>
        <div className="actions">
          <Button onClick={() => setScreen("scene")} icon="arrow">
            {english ? "Discover the situation" : "اكتشف الموقف"}
          </Button>
          <Button onClick={() => setScreen("map")} secondary>
            {english ? "Return to map" : "العودة للخريطة"}
          </Button>
        </div>
      </div>
    </section>
  );
}

function Scene({
  setScreen,
  language,
  scenario,
}: {
  setScreen: (s: Screen) => void;
  language: Language;
  scenario: ScenarioContent;
}) {
  const english = language === "en";
  return (
    <section className="scene-layout">
      <JourneyTitle
        step={english ? "STEP 02" : "المحطة 02"}
        title={scenario.scene.heading[language]}
      />
      <div className="cinema-frame">
        <div className="caption">
          <span>{english ? "THE SCENE" : "المشهد"}</span>
          <p>{scenario.scene.body[language]}</p>
        </div>
        <div className="video-controls">
          <button>
            <Icon name="pause" />
          </button>
          <div>
            <i />
          </div>
          <span>00:18 / 00:24</span>
          <b>CC</b>
        </div>
      </div>
      <Button onClick={() => setScreen("emotion")} icon="arrow">
        {english ? "Continue calmly" : "تابع بهدوء"}
      </Button>
    </section>
  );
}

function Emotion({
  setScreen,
  language,
  scenario,
  selectedEmotion,
  setSelectedEmotion,
}: {
  setScreen: (s: Screen) => void;
  language: Language;
  scenario: ScenarioContent;
  selectedEmotion: string | null;
  setSelectedEmotion: (emotionId: string | null) => void;
}) {
  const english = language === "en";
  return (
    <section className="choice-layout">
      <JourneyTitle
        step={english ? "STEP 03" : "المحطة 03"}
        title={scenario.emotion.question[language]}
      />
      <p className="question-hint">{scenario.emotion.hint[language]}</p>
      <div className="choice-grid emotion-grid">
        {scenario.emotion.options.map((item, i) => (
          <button
            key={item.id}
            className={`choice-card glass-panel ${selectedEmotion === item.id ? "selected" : ""}`}
            onClick={() => setSelectedEmotion(item.id)}
          >
            <span className="choice-index">0{i + 1}</span>
            <i>{item.symbol}</i>
            <h2>{item.name[language]}</h2>
            <p>{item.note[language]}</p>
            <span className="radio">
              {selectedEmotion === item.id && <Icon name="check" size={16} />}
            </span>
          </button>
        ))}
      </div>
      <Button
        onClick={() => selectedEmotion !== null && setScreen("behavior")}
        icon="arrow"
        disabled={selectedEmotion === null}
      >
        {english ? "Confirm feeling" : "تأكيد الشعور"}
      </Button>
    </section>
  );
}

function Behavior({
  setScreen,
  language,
  scenario,
  selectedAction,
  setSelectedAction,
}: {
  setScreen: (s: Screen) => void;
  language: Language;
  scenario: ScenarioContent;
  selectedAction: string | null;
  setSelectedAction: (actionId: string | null) => void;
}) {
  const english = language === "en";
  return (
    <section className="choice-layout">
      <JourneyTitle
        step={english ? "STEP 04" : "المحطة 04"}
        title={scenario.behavior.question[language]}
      />
      <p className="question-hint">{scenario.behavior.hint[language]}</p>
      <div className="choice-grid behavior-grid">
        {scenario.behavior.options.map((item, i) => (
          <button
            key={item.id}
            className={`choice-card behavior-card glass-panel ${selectedAction === item.id ? "selected" : ""}`}
            onClick={() => setSelectedAction(item.id)}
          >
            <span className="tag">{item.tag[language]}</span>
            <span className="choice-index">0{i + 1}</span>
            <div className="behavior-icon">
              {item.icon === "regulate" ? <Icon name="pause" /> : item.icon === "impulse" ? "!" : "↗"}
            </div>
            <h2>{item.name[language]}</h2>
            <p>{item.note[language]}</p>
            <span className="radio">
              {selectedAction === item.id && <Icon name="check" size={16} />}
            </span>
          </button>
        ))}
      </div>
      <Button
        onClick={() => selectedAction !== null && setScreen("outcome")}
        icon="arrow"
        disabled={selectedAction === null}
      >
        {english ? "See the ripple effect" : "شاهد أثر الموجة"}
      </Button>
    </section>
  );
}

function Outcome({
  language,
  scenario,
  selectedAction,
  onComplete,
}: {
  language: Language;
  scenario: ScenarioContent;
  selectedAction: string | null;
  onComplete: (destination: Screen) => void;
}) {
  const english = language === "en";
  const [reflection, setReflection] = useState("");
  const action =
    scenario.behavior.options.find((item) => item.id === selectedAction) ?? scenario.behavior.options[0];
  return (
    <section className="outcome-layout">
      <JourneyTitle
        step={english ? "STEP 05" : "المحطة 05"}
        title={english ? "The ripple effect" : "أثر الموجة"}
      />
      <div className="outcome-copy glass-panel">
        <div className="success-mark">
          <Icon name="spark" size={30} />
        </div>
        <span>{action.outcome.eyebrow[language]}</span>
        <h2>{action.outcome.title[language]}</h2>
        <p>{action.outcome.body[language]}</p>
        <label>
          {scenario.reflectionPrompt[language]}
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder={
              english ? "Write a short idea just for you..." : "اكتب فكرة قصيرة لك وحدك..."
            }
          />
        </label>
        <div className="actions">
          <Button onClick={() => onComplete("map")} icon="compass">
            {english ? "Return to map" : "العودة إلى الخريطة"}
          </Button>
          <Button onClick={() => onComplete("calm")} secondary icon="heart">
            {english ? "Quiet Space" : "مساحة هادئة"}
          </Button>
        </div>
      </div>
    </section>
  );
}

function Closure({ setScreen, language }: { setScreen: (s: Screen) => void; language: Language }) {
  const english = language === "en";
  const tips = english
    ? [
        ["Your feelings make sense", "Feelings are signals that deserve your attention, not proof of weakness."],
        ["Pause before you react", "Try 4 seconds in, 4 seconds hold, and 4 seconds out."],
        ["You do not have to carry it alone", "Sharing with a trusted person can make the next step clearer."],
      ]
    : [
        ["مشاعرك طبيعية ومفهومة", "المشاعر رسائل تحتاج إلى انتباهك، وليست دليلاً على الضعف."],
        ["توقّف لثوانٍ قبل رد الفعل", "جرّب 4 ثوانٍ شهيق، 4 ثوانٍ حبس، و4 ثوانٍ زفير."],
        ["لست مضطراً لحل كل شيء وحدك", "مشاركة ما تشعر به مع شخص تثق به قد توضح لك الخطوة التالية."],
      ];
  return (
    <section className="outcome-layout closure-layout" dir={english ? "ltr" : "rtl"}>
      <JourneyTitle
        step={english ? "YOUR JOURNEY" : "رحلتك"}
        title={english ? "A message to carry with you" : "رسالة الختام"}
      />
      <div className="outcome-copy glass-panel closure-copy">
        <div className="success-mark">
          <Icon name="spark" size={30} />
        </div>
        <span>{english ? "YOU TOOK A PAUSE" : "أعطيت نفسك مساحة"}</span>
        <h2>{english ? "Thank you for taking time to understand your feelings." : "شكراً لأنك منحت نفسك وقتاً لتفهم مشاعرك."}</h2>
        <p>
          {english
            ? "There is no wrong feeling. You can protect yourself and express what is inside you in a healthy way. You are not alone, and asking for help is a step toward strength and safety."
            : "لا يوجد شعور خاطئ. يمكنك حماية نفسك والتعبير عما بداخلك بطريقة صحية. أنت لست وحدك، وطلب المساعدة خطوة نحو القوة والأمان."}
        </p>
        <div className="closing-tips">
          {tips.map(([title, copy]) => (
            <article key={title}>
              <Icon name="heart" size={18} />
              <div>
                <strong>{title}</strong>
                <p>{copy}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="actions closure-actions">
          <Button onClick={() => setScreen("calm")} icon="heart">
            {english ? "Quiet Space" : "مساحة هادئة"}
          </Button>
          <Button onClick={() => setScreen("support")} secondary icon="help">
            {english ? "Ask for support" : "خيارات الدعم"}
          </Button>
          <Button onClick={() => setScreen("guardian")} secondary icon="person">
            {english ? "Talk to a guardian" : "كيف أخبر ولي أمري؟"}
          </Button>
          <Button onClick={() => setScreen("map")} secondary icon="compass">
            {english ? "Return to map" : "العودة إلى الخريطة"}
          </Button>
        </div>
      </div>
    </section>
  );
}

function Calm({ setScreen, language }: { setScreen: (s: Screen) => void; language: Language }) {
  const english = language === "en";
  const [elapsed, setElapsed] = useState(0);
  const [status, setStatus] = useState<"idle" | "running" | "paused" | "complete">("idle");
  const phase = Math.min(2, Math.floor(elapsed / 4));
  const count = 4 - (elapsed % 4);
  useEffect(() => {
    if (status !== "running") return;
    const id = window.setInterval(() => setElapsed((current) => Math.min(12, current + 1)), 1000);
    return () => window.clearInterval(id);
  }, [status]);
  useEffect(() => {
    if (status === "running" && elapsed >= 12) setStatus("complete");
  }, [elapsed, status]);
  const labels = english
    ? ["Breathe In", "Hold", "Breathe Out"]
    : ["خُذ شهيقاً", "احبس النفس", "أخرج النفس ببطء"];
  const arabicNumber = ["٠", "١", "٢", "٣", "٤"];
  const reset = () => {
    setElapsed(0);
    setStatus("idle");
  };
  const start = () => {
    if (status === "complete") {
      setElapsed(0);
    }
    setStatus("running");
  };
  return (
    <section className="calm-layout" dir={english ? "ltr" : "rtl"}>
      <div className="calm-copy">
        <span className="calm-kicker">
          <Icon name="heart" size={16} />{" "}
          {english ? "YOUR PACE, YOUR SPACE" : "مساحتك، وعلى وتيرتك"}
        </span>
        <h1>{english ? "Quiet Space" : "مساحة هادئة"}</h1>
        <h2>
          {english ? "Your feelings are natural and understandable." : "مشاعرك طبيعية ومفهومة."}
        </h2>
        <p>
          {english
            ? "Take a moment before you decide what to do next."
            : "خذ لحظة قبل أن تقرر ما ستفعله بعد ذلك."}
        </p>
      </div>
      <div className={`breathing-experience phase-${phase} status-${status}`}>
        <div className="breathing-ring" aria-live="polite" aria-atomic="true">
          <span className="ring-orbit" />
          {status === "complete" ? (
            <div className="breathing-complete">
              <Icon name="check" size={30} />
              <strong>{english ? "Well done." : "أحسنت."}</strong>
              <small>{english ? "Take your next gentle step." : "خذ خطوتك الهادئة التالية."}</small>
            </div>
          ) : status === "idle" ? (
            <div className="breathing-idle">
              <span>4–4–4</span>
              <strong>{english ? "Breathing exercise" : "تمرين التنفّس"}</strong>
              <small>{english ? "Three calm stages" : "ثلاث مراحل هادئة"}</small>
            </div>
          ) : (
            <div className="breathing-active">
              <small>{labels[phase]}</small>
              <strong>{english ? count : arabicNumber[count]}</strong>
              <i>{english ? "seconds" : "ثوانٍ"}</i>
            </div>
          )}
        </div>
        <div
          className="breathing-progress"
          aria-label={english ? "Breathing stages" : "مراحل التنفّس"}
        >
          {labels.map((label, index) => (
            <span
              className={
                status !== "idle" && status !== "complete" && phase === index ? "active" : ""
              }
              key={label}
            >
              <i>{index + 1}</i>
              {label}
            </span>
          ))}
        </div>
        <div className="breathing-controls">
          {status === "idle" || status === "complete" ? (
            <Button onClick={start}>
              {english
                ? status === "complete"
                  ? "Breathe again"
                  : "Begin"
                : status === "complete"
                  ? "ابدأ من جديد"
                  : "ابدأ"}
            </Button>
          ) : (
            <button
              className="breath-control"
              onClick={() => setStatus(status === "running" ? "paused" : "running")}
            >
              <Icon name={status === "running" ? "pause" : "arrow"} size={18} />
              {english
                ? status === "running"
                  ? "Pause"
                  : "Continue"
                : status === "running"
                  ? "إيقاف مؤقت"
                  : "متابعة"}
            </button>
          )}
          {status !== "idle" && (
            <button className="breath-control secondary" onClick={reset}>
              <Icon name="close" size={17} />
              {english ? "End" : "إنهاء"}
            </button>
          )}
        </div>
      </div>
      <div className="calm-navigation">
        <button onClick={() => setScreen("support")}>
          <Icon name="help" size={18} />
          {english ? "Support options" : "خيارات الدعم"}
        </button>
        <button onClick={() => setScreen("map")}>
          <Icon name="compass" size={18} />
          {english ? "Return to map" : "العودة إلى الخريطة"}
        </button>
      </div>
    </section>
  );
}

const supportActions = {
  ar: [
    ["person", "تحدث مع شخص تثق به", "اختر شخصاً يصغي إليك ويحترم ما تشعر به."],
    ["home", "الدعم في المنزل", "تحدث مع أحد الوالدين، أخ أو أخت أكبر، أو بالغ قريب تثق بحكمته وحرصه عليك."],
    ["school", "الدعم في المدرسة", "تحدث مع المرشد الطلابي أو الأخصائي النفسي/الاجتماعي أو معلم تفضله."],
    [
      "heart",
      "متى أطلب المساعدة؟",
      "إذا استمر الحزن أو الخوف أو التوتر أكثر من أسبوعين وأثر في نومك أو أكلك أو تركيزك، أو واجهت تنمراً أو تهديداً أو شعرت بعدم الأمان. أخبر بالغاً موثوقاً فوراً إذا شعرت برغبة في إيذاء نفسك أو فقدت السيطرة.",
    ],
  ],
  en: [
    [
      "person",
      "Talk to someone you trust",
      "Choose someone who listens and respects how you feel.",
    ],
    [
      "home",
      "Support at home",
      "Talk to a parent, an older sibling, or another trusted adult who cares about you.",
    ],
    [
      "school",
      "Support at school",
      "Talk to a school counselor, social or mental-health specialist, or a teacher you trust.",
    ],
    [
      "heart",
      "When should I ask for help?",
      "When sadness, fear, or stress lasts more than two weeks and affects sleep, eating, or focus; when there is bullying, a threat, or you do not feel safe. Tell a trusted adult right away if you want to hurt yourself or feel out of control.",
    ],
  ],
};

function Support({ setScreen, language }: { setScreen: (s: Screen) => void; language: Language }) {
  const english = language === "en";
  const [selected, setSelected] = useState(0);
  return (
    <section className="support-layout-new" dir={english ? "ltr" : "rtl"}>
      <aside className="support-sheet glass-panel">
        <span className="support-kicker">{english ? "YOU ARE NOT ALONE" : "لست وحدك"}</span>
        <h1>{english ? "Support" : "الدعم"}</h1>
        <p>
          {english
            ? "Choose one small action that feels safe right now."
            : "اختر خطوة صغيرة تشعر أنها آمنة لك الآن."}
        </p>
        <div className="support-actions">
          {supportActions[language].map(([icon, title], index) => (
            <button
              key={title}
              className={selected === index ? "active" : ""}
              onClick={() => setSelected(index)}
            >
              <Icon name={icon as IconName} size={20} />
              <span>{title}</span>
              <Icon name="arrow" size={16} />
            </button>
          ))}
        </div>
        <div className="support-detail" aria-live="polite">
          <Icon name={supportActions[language][selected][0] as IconName} size={21} />
          <div>
            <strong>{supportActions[language][selected][1]}</strong>
            <p>{supportActions[language][selected][2]}</p>
          </div>
        </div>
        <button className="return-map" onClick={() => setScreen("map")}>
          <Icon name="compass" size={18} />
          {english ? "Return to map" : "العودة إلى الخريطة"}
        </button>
      </aside>
      <div className="support-quiet-note">
        <Icon name="heart" />
        <span>
          {english
            ? "Take your time. You choose what happens next."
            : "خذ وقتك. أنت تختار ما سيحدث بعد ذلك."}
        </span>
      </div>
    </section>
  );
}

function Guardian({ setScreen, language }: { setScreen: (s: Screen) => void; language: Language }) {
  const english = language === "en";
  const steps = english
    ? [
        ["Choose a calm time", "Ask when your guardian is not busy or stressed: “Do you have 10 minutes to talk calmly?”"],
        ["Start with how you feel", "Use “I feel…” instead of blaming someone or listing their mistakes."],
        ["Say what you need", "Be clear whether you want someone to listen, help you feel safe, or help find a solution."],
      ]
    : [
        ["اختر وقتاً هادئاً", "اطلب الحديث عندما لا يكون ولي أمرك مشغولاً أو متوتراً: «هل لديك 10 دقائق نتحدث فيها بهدوء؟»"],
        ["ابدأ بما تشعر به", "استخدم جملة «أنا أشعر…» بدلاً من اللوم أو الحديث عن أخطاء الآخرين."],
        ["حدّد ما تحتاجه", "وضّح إن كنت تحتاج من يستمع إليك، أو يساعدك على الشعور بالأمان، أو يساعدك في إيجاد حل."],
      ];
  return (
    <section className="guardian-layout">
      <JourneyTitle
        step={english ? "WORDS TO HELP YOU START" : "كلمات تساعدك على البدء"}
        title={english ? "How can I tell my guardian?" : "كيف أخبر ولي أمري؟"}
      />
      <div className="speech glass-panel">
        <Icon name="heart" size={26} />
        <blockquote>
          {english
            ? "Do you have 10 minutes to talk with me calmly?"
            : "هل لديك 10 دقائق نتحدث فيها بهدوء؟"}
        </blockquote>
        <div className="sentence-starters">
          <button>{english ? "I feel…" : "أنا أشعر…"}</button>
          <button>{english ? "I need…" : "أحتاج إلى…"}</button>
          <button>{english ? "It is hard for me to…" : "يصعب عليّ أن…"}</button>
        </div>
        <p>
          {english
            ? "You can say it out loud, write it down, or send it in a message."
            : "يمكنك قولها بصوتك، كتابتها، أو إرسالها في رسالة."}
        </p>
        <div className="guardian-steps">
          {steps.map(([title, copy], index) => (
            <article key={title}>
              <span>0{index + 1}</span>
              <div>
                <strong>{title}</strong>
                <p>{copy}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="actions">
          <Button onClick={() => setScreen("calm")} icon="arrow">
            {english ? "Return to Quiet Space" : "العودة للمساحة الهادئة"}
          </Button>
          <Button onClick={() => setScreen("map")} secondary>
            {english ? "Return to map" : "العودة للخريطة"}
          </Button>
        </div>
      </div>
    </section>
  );
}

function Foundations({ setScreen }: { setScreen: (s: Screen) => void }) {
  return (
    <main className="system-page" dir="rtl">
      <header>
        <button className="wordmark" onClick={() => setScreen("landing")}>
          <span>FEELINGS</span>
          <i />
        </button>
        <div>
          <span>01</span>
          <h1>التأسيسات والمكوّنات</h1>
        </div>
        <button className="close-page" onClick={() => setScreen("landing")}>
          <Icon name="close" />
        </button>
      </header>
      <section className="foundation-grid">
        <article>
          <span className="section-no">01 — COLOR</span>
          <h2>ألوان الأعماق</h2>
          <div className="swatches">
            {["#071D40", "#087F9B", "#26C6C7", "#36D6D0", "#8A65CB", "#FF8D7B"].map((c) => (
              <div key={c} style={{ background: c }}>
                <small>{c}</small>
              </div>
            ))}
          </div>
        </article>
        <article>
          <span className="section-no">02 — TYPE</span>
          <h2>الطباعة</h2>
          <div className="type-sample">
            <strong>مشاعرك تستحق أن تُفهم</strong>
            <p>نص عربي واضح وهادئ للمراهقين — Cairo</p>
            <b>FEELINGS / MANROPE</b>
          </div>
        </article>
        <article>
          <span className="section-no">03 — EFFECTS</span>
          <h2>الزجاج والتوهّج</h2>
          <div className="effect-samples">
            <i />
            <i />
            <i />
          </div>
          <p>Glass 20% · Blur 24 · Aqua glow · Violet signal</p>
        </article>
        <article className="components-demo">
          <span className="section-no">04 — COMPONENTS</span>
          <h2>مكوّنات قابلة لإعادة الاستخدام</h2>
          <div>
            <Button>زر أساسي</Button>
            <Button secondary>زر ثانوي</Button>
            <button className="mini-toggle">
              <i /> تقليل الحركة
            </button>
            <span className="demo-signal">
              <Icon name="spark" /> إشارة غامضة
            </span>
          </div>
        </article>
        <article className="spacing">
          <span className="section-no">05 — SPACING & RADIUS</span>
          <h2>الإيقاع والمساحات</h2>
          <div>
            <i>4</i>
            <i>8</i>
            <i>16</i>
            <i>24</i>
            <i>32</i>
            <i>48</i>
          </div>
          <p>Radius 12 / 18 / 28 / 999 · Touch target ≥ 48</p>
        </article>
      </section>
    </main>
  );
}

function AdminShell({
  screen,
  setScreen,
  children,
}: {
  screen: Screen;
  setScreen: (s: Screen) => void;
  children: React.ReactNode;
}) {
  return (
    <main className="admin-page" dir="rtl">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span className="wave-logo">≈</span>
          <div>
            <strong>FEELINGS</strong>
            <small>إدارة المحتوى</small>
          </div>
        </div>
        <nav>
          <button
            className={screen === "admin-library" ? "active" : ""}
            onClick={() => setScreen("admin-library")}
          >
            <Icon name="layers" /> مكتبة السيناريوهات
          </button>
          <button
            className={screen === "admin-builder" ? "active" : ""}
            onClick={() => setScreen("admin-builder")}
          >
            <Icon name="plus" /> إنشاء سيناريو
          </button>
          <button
            className={screen === "admin-review" ? "active" : ""}
            onClick={() => setScreen("admin-review")}
          >
            <Icon name="send" /> مراجعة ونشر
          </button>
          <button onClick={() => setScreen("map")}>
            <Icon name="eye" /> معاينة تجربة اللاعب
          </button>
        </nav>
        <div className="admin-user">
          <i>رن</i>
          <div>
            <strong>رنا نصّار</strong>
            <small>محررة محتوى</small>
          </div>
        </div>
      </aside>
      <div className="admin-main">{children}</div>
    </main>
  );
}

function AdminLibrary({
  setScreen,
  scenarios,
}: {
  setScreen: (s: Screen) => void;
  scenarios: Scenario[];
}) {
  const [filter, setFilter] = useState<ScenarioStatus | "all">("all");
  const statusFilters: Array<{ id: ScenarioStatus | "all"; label: string }> = [
    { id: "all", label: "الكل" },
    { id: "draft", label: "مسودة" },
    { id: "review", label: "قيد المراجعة" },
    { id: "published", label: "منشور" },
    { id: "archived", label: "مؤرشف" },
  ];
  return (
    <AdminShell screen="admin-library" setScreen={setScreen}>
      <header className="admin-header">
        <div>
          <span>مساحة المحتوى</span>
          <h1>مكتبة السيناريوهات</h1>
          <p>أنشئ مواقف آمنة وراجع رحلة اللاعب قبل النشر.</p>
        </div>
        <Button onClick={() => setScreen("admin-builder")} icon="plus">
          إضافة سيناريو
        </Button>
      </header>
      <section className="admin-card">
        <div className="admin-tools">
          <label>
            <Icon name="search" />
            <input placeholder="ابحث بعنوان داخلي أو تلميح غامض" />
          </label>
          <div>
            {statusFilters.map((item) => (
              <button
                key={item.id}
                className={filter === item.id ? "active" : ""}
                onClick={() => setFilter(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <div className="scenario-list">
          <div className="table-head">
            <span>السيناريو الداخلي</span>
            <span>ما يراه اللاعب</span>
            <span>الحالة</span>
            <span>المنطقة</span>
            <span />
          </div>
          {scenarios
            .filter((scenario) => filter === "all" || scenario.status === filter)
            .map((s, i) => (
              <div className="scenario-row" key={s.id}>
                <span>
                  <i className={`thumb t-${i}`} />
                  <strong>{s.internalTitle}</strong>
                </span>
                <span>{mysteryLabels.ar[s.label]}</span>
                <span className={`status status-${s.status}`}>
                  {scenarioStatusLabels[s.status]}
                </span>
                <span>{mapRegions.find((item) => item.id === s.region)?.ar ?? "—"}</span>
                <button onClick={() => setScreen("admin-builder")}>
                  تحرير <Icon name="arrow" size={17} />
                </button>
              </div>
            ))}
        </div>
      </section>
    </AdminShell>
  );
}

function Field({
  label,
  value,
  area = false,
  onChange,
}: {
  label: string;
  value?: string;
  area?: boolean;
  onChange?: (value: string) => void;
}) {
  return (
    <label className="admin-field">
      <span>{label}</span>
      {area ? (
        <textarea
          value={onChange ? (value ?? "") : undefined}
          defaultValue={onChange ? undefined : value}
          onChange={onChange ? (event) => onChange(event.target.value) : undefined}
        />
      ) : (
        <input
          value={onChange ? (value ?? "") : undefined}
          defaultValue={onChange ? undefined : value}
          onChange={onChange ? (event) => onChange(event.target.value) : undefined}
        />
      )}
    </label>
  );
}

function AdminBuilder({
  setScreen,
  draft,
  setDraft,
}: {
  setScreen: (s: Screen) => void;
  draft: ScenarioDraft;
  setDraft: (draft: ScenarioDraft) => void;
}) {
  const [step, setStep] = useState(1);
  return (
    <AdminShell screen="admin-builder" setScreen={setScreen}>
      <header className="admin-header">
        <div>
          <span>سيناريو جديد / مسودة</span>
          <h1>إنشاء سيناريو</h1>
          <p>يبقى العنوان الداخلي مخفياً عن اللاعب حتى لحظة الاكتشاف.</p>
        </div>
        <div className="actions">
          <Button secondary>حفظ المسودة</Button>
          <Button onClick={() => setScreen("admin-review")} icon="arrow">
            المراجعة
          </Button>
        </div>
      </header>
      <div className="builder-progress">
        {["الأساسيات", "المشهد", "المشاعر", "التصرفات", "التأمل والدعم"].map((x, i) => (
          <button className={step === i + 1 ? "active" : ""} onClick={() => setStep(i + 1)} key={x}>
            <i>{i + 1}</i>
            <span>{x}</span>
          </button>
        ))}
      </div>
      <section className="builder-grid">
        <div className="admin-card builder-form">
          {step === 1 && (
            <>
              <h2>الأساسيات والتلميح</h2>
              <Field
                label="عنوان السيناريو — للإدارة فقط"
                value={draft.internalTitle}
                onChange={(internalTitle) => setDraft({ ...draft, internalTitle })}
              />
              <Field
                label="التلميح الغامض الذي يراه اللاعب"
                value={draft.mysteryHint}
                onChange={(mysteryHint) => setDraft({ ...draft, mysteryHint })}
              />
              <Field
                label="وصف قصير دون كشف الموقف"
                value={draft.summary}
                area
                onChange={(summary) => setDraft({ ...draft, summary })}
              />
              <label className="admin-field">
                <span>منطقة الخريطة</span>
                <select
                  value={draft.region}
                  onChange={(event) => setDraft({ ...draft, region: Number(event.target.value) })}
                >
                  {mapRegions.map((item) => (
                    <option value={item.id} key={item.id}>
                      {item.ar}
                    </option>
                  ))}
                </select>
              </label>
            </>
          )}
          {step === 2 && (
            <>
              <h2>مشهد الموقف</h2>
              <div className="upload-zone">
                <Icon name="plus" size={32} />
                <strong>رفع صورة أو فيديو للمشهد</strong>
                <span>16:9 · MP4, WebM, JPG أو PNG</span>
              </div>
              <Field
                label="النص المصاحب / الترجمة"
                value="أعلنت المعلمة فجأة عن اختبار قصير..."
                area
              />
            </>
          )}
          {step === 3 && (
            <>
              <h2>سؤال المشاعر</h2>
              <Field label="السؤال" value="ماذا تشعر الشخصية في هذه اللحظة؟" />
              <Field label="الخيار الأول" value="قلق" />
              <Field label="الخيار الثاني" value="تحدٍ" />
              <Field label="الخيار الثالث" value="لامبالاة" />
            </>
          )}
          {step === 4 && (
            <>
              <h2>خيارات التصرف والنتائج</h2>
              {scenarioContents[0].behavior.options.map((b, i) => (
                <div className="compact-choice" key={b.name.ar}>
                  <b>الخيار {i + 1}</b>
                  <input defaultValue={b.name.ar} />
                  <textarea defaultValue={b.note.ar} />
                </div>
              ))}
            </>
          )}
          {step === 5 && (
            <>
              <h2>التأمل ونصيحة الدعم</h2>
              <Field label="رسالة النتيجة" value="عاد التركيز خطوة خطوة." />
              <Field label="سؤال التأمل" value="ما الذي قد يساعدك أنت في المرة القادمة؟" />
              <Field label="نصيحة دعم اختيارية" value="يمكنك التحدث إلى شخص بالغ تثق به." area />
            </>
          )}
          <div className="form-footer">
            <button disabled={step === 1} onClick={() => setStep(step - 1)}>
              السابق
            </button>
            <Button
              onClick={() => (step < 5 ? setStep(step + 1) : setScreen("admin-review"))}
              icon="arrow"
            >
              {step < 5 ? "التالي" : "المراجعة"}
            </Button>
          </div>
        </div>
        <aside className="player-preview">
          <div className="preview-top">
            <span>معاينة اللاعب</span>
            <i>RTL</i>
          </div>
          <div className={`preview-screen preview-${step}`}>
            <div className="preview-glow" />
            <span className="preview-signal">
              {step === 1
                ? draft.mysteryHint || "إشارة غامضة"
                : step === 2
                  ? "لحظة مفاجئة"
                  : step === 3
                    ? "ماذا تشعر؟"
                    : step === 4
                      ? "اختر تصرّفك"
                      : "أثر الموجة"}
            </span>
          </div>
          <small>يتم تحديث المعاينة تلقائياً</small>
        </aside>
      </section>
    </AdminShell>
  );
}

function AdminReview({
  setScreen,
  onPublish,
}: {
  setScreen: (s: Screen) => void;
  onPublish: () => void;
}) {
  const [checks, setChecks] = useState([true, true, true, true, false]);
  const toggle = (i: number) => setChecks((c) => c.map((x, n) => (n === i ? !x : x)));
  return (
    <AdminShell screen="admin-review" setScreen={setScreen}>
      <header className="admin-header">
        <div>
          <span>الخطوة الأخيرة</span>
          <h1>مراجعة ونشر</h1>
          <p>راجع رحلة اللاعب وسلامة المحتوى قبل إطلاق الإشارة.</p>
        </div>
      </header>
      <section className="review-grid">
        <div className="admin-card checklist">
          <div className="ready-score">
            <Icon name="check" size={28} />
            <div>
              <strong>
                {checks.filter(Boolean).length === 5 ? "جاهز للنشر" : "قارب على الجاهزية"}
              </strong>
              <span>{checks.filter(Boolean).length} من 5 مكتملة</span>
            </div>
          </div>
          <h2>قائمة فحص الجودة</h2>
          {[
            "مراجعة سلامة المحتوى",
            "النصوص المصاحبة للمشهد",
            "اتجاه العربية RTL",
            "إمكانية الوصول والتباين",
            "معلومات الدعم مناسبة وواضحة",
          ].map((c, i) => (
            <button className={checks[i] ? "done" : ""} onClick={() => toggle(i)} key={c}>
              <i>{checks[i] && <Icon name="check" size={16} />}</i>
              <span>{c}</span>
              <small>{checks[i] ? "مكتمل" : "يحتاج مراجعة"}</small>
            </button>
          ))}
        </div>
        <div className="admin-card publish-card">
          <span className="section-no">معاينة مسار اللاعب</span>
          <div className="flow-preview">
            {["إشارة غامضة", "المشهد", "الشعور", "التصرف", "النتيجة"].map((x, i) => (
              <div key={x}>
                <i>{i + 1}</i>
                <span>{x}</span>
              </div>
            ))}
          </div>
          <div className="publish-rule">
            <Icon name="spark" />
            <p>
              <strong>قاعدة النشر</strong>النشر ينشئ تلقائياً إشارة غامضة على التيار S أو فرع ثانوي.
              لا يرى اللاعب أبداً عنوان السيناريو الإداري قبل الاكتشاف.
              <small className="admin-behavior-note" dir="ltr">
                Publishing a scenario automatically adds it to the next available route position and
                recalculates equal spacing.
              </small>
            </p>
          </div>
          <Button onClick={onPublish} icon="send">
            نشر وإنشاء الإشارة
          </Button>
        </div>
      </section>
    </AdminShell>
  );
}

function ScreenNavigator({
  screen,
  setScreen,
}: {
  screen: Screen;
  setScreen: (s: Screen) => void;
}) {
  const [open, setOpen] = useState(false);
  const groups = useMemo(() => [...new Set(screenMeta.map((x) => x.group))], []);
  return (
    <div className={`screen-nav ${open ? "open" : ""}`} dir="rtl">
      <button
        className="screen-nav-trigger"
        onClick={() => setOpen(!open)}
        aria-label="استعراض الشاشات"
      >
        <Icon name={open ? "close" : "menu"} />
        <span>استعراض الشاشات</span>
      </button>
      {open && (
        <div className="screen-nav-panel">
          <div className="screen-nav-head">
            <div>
              <small>FEELINGS UI PROJECT</small>
              <strong>كل الشاشات</strong>
            </div>
            <span>{screenMeta.find((x) => x.id === screen)?.label}</span>
          </div>
          {groups.map((group) => (
            <section key={group}>
              <h3>{group}</h3>
              <div>
                {screenMeta
                  .filter((x) => x.group === group)
                  .map((item) => (
                    <button
                      className={screen === item.id ? "active" : ""}
                      onClick={() => {
                        setScreen(item.id);
                        setOpen(false);
                      }}
                      key={item.id}
                    >
                      {item.label}
                    </button>
                  ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

const ACCESSIBILITY_STORAGE_KEY = "feelings-accessibility";
const textScaleValues: Record<TextScale, number> = {
  small: 0.9,
  default: 1,
  large: 1.15,
  xlarge: 1.3,
};

function getInitialAccessibility(): AccessibilitySettings {
  const defaults: AccessibilitySettings = {
    textScale: "default",
    colorVision: "default",
    highContrast: false,
    reduceMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    captions: true,
    focusHighlight: true,
  };
  try {
    const saved = JSON.parse(
      window.localStorage.getItem(ACCESSIBILITY_STORAGE_KEY) ?? "{}",
    ) as Partial<AccessibilitySettings>;
    const textScale = ["small", "default", "large", "xlarge"].includes(String(saved.textScale))
      ? (saved.textScale as TextScale)
      : defaults.textScale;
    const colorVision = ["default", "protanopia", "deuteranopia", "tritanopia"].includes(
      String(saved.colorVision),
    )
      ? (saved.colorVision as ColorVision)
      : defaults.colorVision;
    return { ...defaults, ...saved, textScale, colorVision };
  } catch {
    return defaults;
  }
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [accessibility, setAccessibility] =
    useState<AccessibilitySettings>(getInitialAccessibility);
  const [scenarios, setScenarios] = useState<Scenario[]>(initialScenarios);
  const [draft, setDraft] = useState<ScenarioDraft>(createScenarioDraft);
  const [activeScenarioId, setActiveScenarioId] = useState<number>(coreScenarioIds[0]);
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [arriving, setArriving] = useState(false);
  const [language, setLanguage] = useState<Language>("ar");
  const [guideOpen, setGuideOpen] = useState(false);
  const arrivalTimer = useRef<number | null>(null);
  const showScreenNavigator =
    import.meta.env.DEV && new URLSearchParams(window.location.search).has("screens");
  useEffect(() => {
    window.localStorage.setItem(ACCESSIBILITY_STORAGE_KEY, JSON.stringify(accessibility));
  }, [accessibility]);
  useEffect(
    () => () => {
      if (arrivalTimer.current !== null) window.clearTimeout(arrivalTimer.current);
    },
    [],
  );
  const completeIntro = () => {
    setArriving(true);
    setScreen("landing");
    if (arrivalTimer.current !== null) window.clearTimeout(arrivalTimer.current);
    arrivalTimer.current = window.setTimeout(
      () => setArriving(false),
      accessibility.reduceMotion ? 450 : 1500,
    );
  };
  const changeScreen = (next: Screen) => {
    setGuideOpen(false);
    window.scrollTo(0, 0);
    if (next === "landing" && screen !== "splash") {
      setArriving(false);
      setScreen("splash");
      return;
    }
    setScreen(next);
  };
  const publishScenario = () => {
    setScenarios((current) => {
      const id = current.reduce((highest, scenario) => Math.max(highest, scenario.id), 0) + 1;
      return [
        ...current,
        {
          id,
          internalTitle: draft.internalTitle.trim() || `سيناريو جديد ${id}`,
          label: (id - 1) % mysteryLabels.ar.length,
          mysteryHint:
            draft.mysteryHint.trim() || mysteryLabels.ar[(id - 1) % mysteryLabels.ar.length],
          summary: draft.summary.trim(),
          duration: [5, 7, 8, 10][(id - 1) % 4],
          state: "available",
          region: draft.region,
          status: "published",
        },
      ];
    });
    setDraft(createScenarioDraft());
    changeScreen("map");
  };
  const startScenario = (id: number) => {
    if (!scenarioContent[id]) return;
    setActiveScenarioId(id);
    setSelectedEmotion(null);
    setSelectedAction(null);
    changeScreen("mystery");
  };
  const completeScenario = (destination: Screen) => {
    setScenarios((current) =>
      current.map((scenario) =>
        scenario.id === activeScenarioId ? { ...scenario, state: "complete" } : scenario,
      ),
    );
    changeScreen(destination);
  };
  const activeScenario = scenarioContent[activeScenarioId] ?? scenarioContent[coreScenarioIds[0]];
  const canFinishJourney = coreScenarioIds.every(
    (id) => scenarios.find((scenario) => scenario.id === id)?.state === "complete",
  );
  let content: React.ReactNode;
  if (screen === "splash")
    content = <Splash onComplete={completeIntro} reduced={accessibility.reduceMotion} />;
  else if (screen === "foundations") content = <Foundations setScreen={changeScreen} />;
  else if (screen === "admin-library")
    content = <AdminLibrary setScreen={changeScreen} scenarios={scenarios} />;
  else if (screen === "admin-builder")
    content = <AdminBuilder setScreen={changeScreen} draft={draft} setDraft={setDraft} />;
  else if (screen === "admin-review")
    content = <AdminReview setScreen={changeScreen} onPublish={publishScenario} />;
  else {
    const props = { setScreen: changeScreen };
    const screens: Record<string, React.ReactNode> = {
      landing: <Landing {...props} {...{ language, guideOpen, setGuideOpen }} />,
      map: (
        <MapScreen
          {...props}
          {...{ language, scenarios, onStartScenario: startScenario, canFinishJourney }}
        />
      ),
      mystery: <Mystery {...props} {...{ language, scenario: activeScenario }} />,
      scene: <Scene {...props} {...{ language, scenario: activeScenario }} />,
      emotion: (
        <Emotion
          {...props}
          {...{
            language,
            scenario: activeScenario,
            selectedEmotion,
            setSelectedEmotion,
          }}
        />
      ),
      behavior: (
        <Behavior
          {...props}
          {...{
            language,
            scenario: activeScenario,
            selectedAction,
            setSelectedAction,
          }}
        />
      ),
      outcome: (
        <Outcome
          {...props}
          {...{ language, scenario: activeScenario, selectedAction, onComplete: completeScenario }}
        />
      ),
      closure: <Closure {...props} language={language} />,
      calm: <Calm {...props} language={language} />,
      support: <Support {...props} language={language} />,
      guardian: <Guardian {...props} language={language} />,
    };
    content = (
      <Ocean
        screen={screen}
        setScreen={changeScreen}
        onGuide={screen === "landing" ? () => setGuideOpen(true) : undefined}
        arriving={arriving}
        {...{
          reduced: accessibility.reduceMotion,
          language,
          setLanguage,
          accessibility,
          setAccessibility,
        }}
      >
        {screens[screen]}
      </Ocean>
    );
  }
  return (
    <div
      className={`app-shell text-${accessibility.textScale} color-${accessibility.colorVision} ${accessibility.highContrast ? "high-contrast" : ""} ${accessibility.captions ? "captions-on" : "captions-off"} ${accessibility.focusHighlight ? "focus-highlight" : ""}`}
      dir={language === "en" ? "ltr" : "rtl"}
      style={{ "--text-scale": textScaleValues[accessibility.textScale] } as React.CSSProperties}
    >
      {content}
      {showScreenNavigator && screen !== "splash" && (
        <ScreenNavigator screen={screen} setScreen={changeScreen} />
      )}
    </div>
  );
}
