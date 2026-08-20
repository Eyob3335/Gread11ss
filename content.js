/* =========================================================================
   CONTENT.JS
   Curriculum data for the Grade 11 offline learning app.
   Every question below is written from the real Ethiopian MoE Grade 11
   student textbooks (Economics, IT, Geography, History — 2023 editions)
   supplied by the user. Facts, definitions and figures are grounded in
   those books; wording is original (quiz-style), not copied text.

   HOW TO ADD MORE CONTENT
   ------------------------
   Each subject has a `units` array. Each unit has a `lessons` array.
   A unit with an EMPTY lessons array will show as "Coming soon" on the
   path but still appears, so the whole year's roadmap is visible.
   To add a new lesson, copy the shape of an existing lesson object and
   drop it into that unit's `lessons` array — the app needs nothing else.

   Question shapes:
   { type:'mcq', q, options:[...], answer: <index>, explain }
   { type:'tf',  q, answer: true|false, explain }
   { type:'fill',q, answer: 'text' (case-insensitive), hint, explain }
   ========================================================================= */

const CURRICULUM = {

  economics: {
    name: "Economics",
    tagline: "Markets, money & choices",
    color: "#C8862A",
    colorDark: "#8f5e17",
    icon: "coin",
    units: [
      {
        title: "Theory of Consumer Behavior and Demand",
        lessons: [
          {
            title: "Cardinal Utility & Marginal Utility",
            xp: 15,
            questions: [
              { type:'mcq', q:"Cardinal utility theory assumes satisfaction from a good can be measured in:", options:["Absolute numbers (utils)","Rankings only","Money spent only","It cannot be measured at all"], answer:0, explain:"Cardinal utility theory measures satisfaction in absolute numbers, called 'utils'." },
              { type:'mcq', q:"What is 'marginal utility'?", options:["The total satisfaction from all units consumed","The extra satisfaction from consuming one more unit of a good","The price of the last unit bought","The average utility of all goods combined"], answer:1, explain:"Marginal utility (MU) is the additional satisfaction gained from a one-unit change in consumption." },
              { type:'tf', q:"The Law of Diminishing Marginal Utility says MU rises as you consume more of a good.", answer:false, explain:"It's the opposite — as consumption increases, marginal utility decreases." },
              { type:'fill', q:"The unit used to measure cardinal utility is called a ______.", answer:"util", hint:"Starts with 'u'", explain:"Cardinal utility is measured in hypothetical units called 'utils'." },
              { type:'mcq', q:"At consumer optimum with two goods X and Y, which condition holds?", options:["MUx / Px = MUy / Py","MUx = MUy always","Px = Py always","Income is left unspent"], answer:0, explain:"Optimum occurs where marginal utility per unit of money spent is equal across goods, and income = expenditure." },
              { type:'mcq', q:"If Fenet's total utility from tea rises from 40 to 50 utils after drinking a 5th cup, the marginal utility of that cup is:", options:["40 utils","50 utils","10 utils","90 utils"], answer:2, explain:"Marginal utility = change in total utility = 50 − 40 = 10 utils." },
            ]
          },
          {
            title: "Ordinal Utility & Preferences",
            xp: 15,
            questions: [
              { type:'mcq', q:"The ordinal utility approach argues that consumers can:", options:["Measure utility in exact utils","Only rank bundles by preference, not measure them exactly","Never compare two bundles","Only buy one good at a time"], answer:1, explain:"Ordinal utility says consumers can rank (order) bundles as preferred, less preferred, or equal — not assign exact numbers." },
              { type:'mcq', q:"If a consumer prefers bundle X to bundle Y, this is written as:", options:["X ~ Y","Y > X","X > Y","X = Y"], answer:2, explain:"X > Y means the consumer prefers X to Y." },
              { type:'mcq', q:"When a consumer gets equal satisfaction from two bundles X and Y, we write:", options:["X > Y","X ~ Y","Y > X","None of the above"], answer:1, explain:"X ~ Y denotes indifference — equal satisfaction from both bundles." },
              { type:'tf', q:"Under the 'rational consumer' assumption, consumers aim to maximize satisfaction given limited income.", answer:true, explain:"Rationality means consumers try to get the most utility possible within their budget." },
              { type:'tf', q:"The 'non-satiation' assumption says consumers eventually get tired of having more goods.", answer:false, explain:"Non-satiation means the opposite: consumers always prefer more of a good to less." },
              { type:'mcq', q:"Preferences being 'transitive' means:", options:["If X>Y and Y>Z, then X>Z","X is always equal to Y","Preferences change every day","Consumers can't compare bundles"], answer:0, explain:"Transitivity (consistency) means preference ordering is logically consistent across bundles." },
            ]
          },
          {
            title: "Indifference Curves",
            xp: 20,
            questions: [
              { type:'mcq', q:"An indifference curve shows combinations of two goods that give the consumer:", options:["Different levels of satisfaction","The same level of satisfaction","The lowest possible cost","The highest possible price"], answer:1, explain:"An indifference curve (IC) is the locus of bundles that all yield equal satisfaction — the consumer is indifferent between them." },
              { type:'tf', q:"Indifference curves are negatively sloped (they slope downward to the right).", answer:true, explain:"To keep utility constant, gaining more of one good requires giving up some of the other — hence a negative slope." },
              { type:'mcq', q:"A collection of many indifference curves for one consumer is called:", options:["A budget line","An indifference map","A demand schedule","A utility ledger"], answer:1, explain:"An indifference map is the full set of a consumer's indifference curves, each representing a different satisfaction level." },
              { type:'mcq', q:"Between two indifference curves IC1 (lower) and IC2 (higher), which represents greater satisfaction?", options:["IC1","IC2","They are equal","Neither — ICs don't show satisfaction level"], answer:1, explain:"Higher indifference curves represent higher levels of utility/satisfaction." },
              { type:'fill', q:"The rate at which a consumer is willing to trade one good for another while keeping satisfaction constant is called the Marginal Rate of ______.", answer:"substitution", hint:"MRS stands for Marginal Rate of ___", explain:"This is the Marginal Rate of Substitution (MRS) — the slope of the indifference curve." },
              { type:'mcq', q:"Given consumption baskets R (A1,B1) and S (A2,B2) where S has more of both goods than R, which does a rational consumer prefer?", options:["R, because less is more","S, because more is preferred to less","Both equally","Neither — cannot be compared"], answer:1, explain:"Since more is preferred to less, bundle S — which has more of both goods — gives greater total satisfaction." },
            ]
          },
        ]
      },
      { title: "Market Structure and the Decision of Firms", lessons: [] },
      { title: "National Income Accounting", lessons: [] },
      { title: "Consumption, Saving and Investment", lessons: [] },
      { title: "Trade and Finance", lessons: [] },
      { title: "Economic Development", lessons: [] },
      { title: "Main Sectors, Sectorial Policies and Strategies of Ethiopia", lessons: [] },
    ]
  },

  it: {
    name: "Information Technology",
    tagline: "Systems, code & the digital world",
    color: "#2E86AB",
    colorDark: "#1c5673",
    icon: "chip",
    units: [
      {
        title: "Information Systems and Its Applications",
        lessons: [
          {
            title: "Data vs. Information",
            xp: 15,
            questions: [
              { type:'mcq', q:"'Data' is best described as:", options:["Raw facts that don't yet give meaning on their own","Processed facts used to answer a question","The highest level of human understanding","A set of interrelated software programs"], answer:0, explain:"Data is raw facts (like numbers or words) that don't carry meaning until put into context — e.g. '100' alone could mean many things." },
              { type:'mcq', q:"Turning daily sales figures into weekly totals that show a trend is an example of:", options:["Data becoming information","Information becoming data","Wisdom becoming knowledge","None of the above"], answer:0, explain:"Raw data becomes information once it is processed in a way that's meaningful — e.g. aggregated to show a trend." },
              { type:'tf', q:"The number '100' by itself is information, because it clearly tells you what it measures.", answer:false, explain:"'100' alone is data — it has no meaning until context is added (e.g. '100 kg' or '100 students')." },
              { type:'mcq', q:"Information can be represented as all of the following EXCEPT:", options:["A table","A bar graph","A formula","An emotion"], answer:3, explain:"Information is commonly shown as tables, graphs, or formulas — not as an emotion." },
              { type:'fill', q:"Data becomes ______ once it is processed in a meaningful way for the end user.", answer:"information", hint:"The next step up from raw data", explain:"Information is data that has been processed, organized, and given meaning." },
            ]
          },
          {
            title: "Knowledge & Wisdom",
            xp: 15,
            questions: [
              { type:'mcq', q:"Knowledge is best described as:", options:["Raw, unprocessed facts","Understanding gained by integrating information from multiple sources","A single unrelated number","The lowest level of the DIKW pyramid"], answer:1, explain:"Knowledge is built by integrating information from reading, discussion, and experience — it includes understanding and skill." },
              { type:'mcq', q:"When a child learns to ride a bicycle by actually practicing (not just being told how), that shift from information to skillful understanding represents:", options:["Data","Wisdom","Knowledge","Noise"], answer:2, explain:"Applying information through practice and understanding turns it into knowledge." },
              { type:'mcq', q:"Wisdom is described in the textbook as:", options:["The lowest level of the DIKW pyramid","The ability to make wise decisions and judgments using knowledge","A synonym for raw data","Something machines have but humans don't"], answer:1, explain:"Wisdom sits at the top of the Data-Information-Knowledge-Wisdom pyramid — it's using knowledge to make good judgments." },
              { type:'tf', q:"In the DIKW pyramid, data sits at the bottom and wisdom sits at the top.", answer:true, explain:"The pyramid runs Data → Information → Knowledge → Wisdom, increasing in value and meaning as you go up." },
              { type:'fill', q:"D-I-K-W stands for Data, Information, Knowledge and ______.", answer:"wisdom", hint:"The top of the pyramid", explain:"Wisdom is the fourth and highest level — the ability to act well using knowledge." },
            ]
          },
          {
            title: "What Is an Information System?",
            xp: 20,
            questions: [
              { type:'mcq', q:"An Information System (IS) is defined as:", options:["A single computer program","A set of interrelated components that collect, process, store and share information","Only the hardware of a computer","A type of programming language"], answer:1, explain:"An IS is a set of interrelated components working together to collect, process, store, and disseminate information to users." },
              { type:'mcq', q:"A school system that records quiz, assignment, and exam scores to calculate a student's average and rank is an example of:", options:["An information system in action","A form of wisdom only","A programming language","Raw data with no use"], answer:0, explain:"This is a classic example of an information system: it captures data and turns it into useful summarized information (averages, ranks)." },
              { type:'tf', q:"Managers use information generated by information systems to make decisions, such as setting a product's price.", answer:true, explain:"Information systems generate reports that support organizational decision-making, like pricing." },
              { type:'mcq', q:"Which best explains why information systems matter to organizations today?", options:["They replace the need for any human decisions","They capture data and generate summarized reports for decision-making","They are only used in schools","They cannot process large amounts of data"], answer:1, explain:"Information systems have become integral to organizations because they turn captured data into decision-ready information." },
            ]
          },
        ]
      },
      { title: "Emerging Technologies", lessons: [] },
      { title: "Database Management", lessons: [] },
      { title: "Web Development", lessons: [] },
      { title: "Hardware Troubleshooting and Preventive Maintenance", lessons: [] },
      { title: "Fundamentals of Programming", lessons: [] },
    ]
  },

  geography: {
    name: "Geography",
    tagline: "Earth, climate & people",
    color: "#2F7D5C",
    colorDark: "#1d4f39",
    icon: "globe",
    units: [
      {
        title: "Formation of the Continents",
        lessons: [
          {
            title: "Origin of the Earth",
            xp: 15,
            questions: [
              { type:'mcq', q:"The theory most widely supported by scientists for the origin of the universe is:", options:["The Big Bang theory","The Flat Earth theory","The Continental Drift theory","The Ice Age theory"], answer:0, explain:"The Big Bang theory explains the universe's origin from an abrupt cosmic explosion of extremely dense, hot matter." },
              { type:'fill', q:"The Sun and all the planets together form the ______ System.", answer:"solar", hint:"Named after our star", explain:"The Sun and planets together make up the Solar System." },
              { type:'mcq', q:"According to the textbook, about how long ago did the Big Bang occur?", options:["10–20 billion years ago","10–20 million years ago","4,000 years ago","1 billion years ago"], answer:0, explain:"The Big Bang is estimated to have occurred roughly 10–20 billion years ago." },
              { type:'tf', q:"Earth was formed from a mixture of gas and dust particles moving around the Sun about 4.5 billion years ago.", answer:true, explain:"Earth formed from gas and dust orbiting the young Sun roughly 4.5 billion years ago." },
            ]
          },
          {
            title: "From Rodinia to Pangaea",
            xp: 15,
            questions: [
              { type:'fill', q:"The very first supercontinent, formed from early landmasses gathering together, was called ______.", answer:"rodinia", hint:"An early supercontinent, before Pangaea", explain:"'Rodinia' was the first early continent formed from gathering land masses." },
              { type:'mcq', q:"The supercontinent that formed around 255–210 million years ago, uniting nearly all landmasses, is called:", options:["Rodinia","Pangaea","Gondwana","Laurasia"], answer:1, explain:"Pangaea was the single supercontinent that existed roughly 255–210 million years ago." },
              { type:'mcq', q:"When Pangaea broke apart, it split into two large landmasses. These were:", options:["Africa and Asia","Gondwanaland and Laurasia","Rodinia and Pangaea","Europe and America"], answer:1, explain:"Pangaea divided (~160 Ma) into Gondwanaland and Laurasia through continental drift." },
              { type:'tf', q:"The Himalayan mountain range formed because the Indian sub-continent collided with Eurasia.", answer:true, explain:"India separated from Gondwana, drifted north, and its collision with Eurasia created the Himalayas." },
            ]
          },
          {
            title: "Continental Drift",
            xp: 20,
            questions: [
              { type:'mcq', q:"Continental drift is best defined as:", options:["Continents moving apart, driven by sea-floor spreading at mid-ocean ridges","Continents shrinking over time","Earth's rotation slowing down","Mountains sinking into the sea"], answer:0, explain:"Continental drift is the gradual movement of continents apart, driven by sea-floor spreading at mid-ocean ridges." },
              { type:'mcq', q:"Which ocean is getting WIDER due to continental drift, according to the textbook?", options:["The Pacific Ocean","The Atlantic Ocean","The Mediterranean Sea","None — oceans don't change size"], answer:1, explain:"Continental drift makes the Atlantic Ocean wider while narrowing the Pacific Ocean and Mediterranean Sea." },
              { type:'tf', q:"Australia separated from Antarctica and is drifting toward the equator.", answer:true, explain:"Australia separated from Antarctica roughly 100 Ma and continues drifting — projected to reach the equator in about 60 million years." },
              { type:'mcq', q:"Which of these is NOT one of the four major continents that formed around 458 million years ago (mid-Ordovician)?", options:["Gondwana","Baltica","Siberia","Australia"], answer:3, explain:"The four major continents at that time were Gondwana, Baltica, Siberia, and Laurasia — Australia wasn't yet separate." },
            ]
          },
        ]
      },
      { title: "Climate Classification and Climate Regions of Our World", lessons: [] },
      { title: "Natural Resources and Conflicts Over Resources", lessons: [] },
      { title: "Global Population Dynamics and Challenges", lessons: [] },
      { title: "Geography and Economic Development", lessons: [] },
      { title: "Major Global Environmental Changes", lessons: [] },
      { title: "Geographic Issues and Public Concerns", lessons: [] },
      { title: "Geo-spatial Information and Data Processing", lessons: [] },
    ]
  },

  history: {
    name: "History",
    tagline: "Peoples, states & change over time",
    color: "#B5553B",
    colorDark: "#7d3626",
    icon: "scroll",
    units: [
      {
        title: "History, Historiography, and Human Evolution",
        lessons: [
          {
            title: "What Is History?",
            xp: 15,
            questions: [
              { type:'mcq', q:"The word 'history' comes from the Greek word 'istoria', which means:", options:["Inquiry or knowledge acquired by investigation","War and conquest","A written law","A royal family record"], answer:0, explain:"'Istoria' (historia) is Greek for inquiry or knowledge gained through investigation." },
              { type:'mcq', q:"As an academic discipline, history is the study of:", options:["Only ancient wars","Past events and their causes, and how they connect to present and future developments","Only oral traditions","Only the biographies of kings"], answer:1, explain:"History studies past events, present situations, and even predicts future developments in social, economic and political life." },
              { type:'tf', q:"'Pre-history' refers to the period after writing was invented, around 4000 B.C.", answer:false, explain:"Pre-history is actually the period BEFORE the invention of writing (before about 4000 B.C.), not after." },
              { type:'mcq', q:"Historians typically try to answer which of these questions about the past?", options:["What, when, how, why, and what consequences?","Only 'when' did it happen?","Only 'who' was involved?","None — historians don't ask questions"], answer:0, explain:"Historians investigate what happened, when, how, why, and what consequences followed." },
              { type:'fill', q:"History can be studied for good, but can also be ______ — for example, by selectively using the past to justify the present.", answer:"abused", hint:"The opposite of used well", explain:"The textbook notes history can be abused when the past is selectively used or judged unfairly by present-day values." },
            ]
          },
          {
            title: "Why History Matters",
            xp: 15,
            questions: [
              { type:'mcq', q:"According to the textbook, studying history helps us:", options:["Understand the present and forecast the future by learning from the past","Only memorize dates","Avoid studying other subjects","Predict the weather"], answer:0, explain:"History helps us understand past society, which in turn increases our understanding of the present and can help forecast the future." },
              { type:'tf', q:"History is important for establishing the identity of families, social groups, institutions and countries.", answer:true, explain:"The textbook states history plays a key role in shaping identity at many levels — from families to entire nations." },
              { type:'mcq', q:"Judging the past strictly by the values and perspectives of the present is described in the textbook as:", options:["The correct scientific method","A serious problem that leads to an unobjective picture of the past","Something historians are required to do","Irrelevant to historical study"], answer:1, explain:"The textbook warns that judging the past by present-day values is a serious problem, common in many countries including Ethiopia." },
              { type:'mcq', q:"Rigorously selecting and examining evidence to draw conclusions in history trains:", options:["Physical strength","The mind — analytical and problem-solving skills","Artistic talent only","Nothing useful"], answer:1, explain:"The disciplined evaluation of evidence in history builds analytical and problem-solving skills." },
            ]
          },
          {
            title: "History and Other Sciences",
            xp: 20,
            questions: [
              { type:'mcq', q:"How does history differ from the natural sciences?", options:["History studies human beings and societies in the past; natural sciences study the physical world","There is no difference at all","History uses controlled lab experiments; natural science does not","Natural sciences study the past only"], answer:0, explain:"Natural sciences examine physical phenomena, while history focuses on human beings and societies in the past." },
              { type:'tf', q:"Unlike natural scientists, historians do not conduct controlled experiments common in the natural sciences.", answer:true, explain:"The textbook notes that history does not use the controlled experiments typical of natural science." },
              { type:'mcq', q:"History is most closely grouped, as an academic discipline, under which broad area?", options:["Natural sciences","Social sciences","Mathematics","Fine arts only"], answer:1, explain:"History is generally considered part of the social sciences, though with its own distinct objectives." },
            ]
          },
        ]
      },
      { title: "Major Spots of Ancient World Civilizations up to c.500 A.D", lessons: [] },
      { title: "Peoples, States and Historical Processes in Ethiopia and the Horn to the End of the 13th Century", lessons: [] },
      { title: "The Middle Ages and Early Modern World, c.500 AD–1789", lessons: [] },
      { title: "Peoples and States of Africa to 1500", lessons: [] },
      { title: "Africa and the Outside World: 1500–1880s", lessons: [] },
      { title: "States, Principalities, Population Movements and Interactions in Ethiopia", lessons: [] },
      { title: "Political, Social and Economic Processes in Ethiopia, Mid-16th to Mid-19th Century", lessons: [] },
      { title: "The Age of Revolutions, 1789 to 1815", lessons: [] },
    ]
  },

};

// Flatten helper: assign stable IDs to every subject/unit/lesson at load time.
(function assignIds(){
  Object.keys(CURRICULUM).forEach(subKey=>{
    const sub = CURRICULUM[subKey];
    sub.key = subKey;
    sub.units.forEach((unit,ui)=>{
      unit.id = `${subKey}-u${ui}`;
      unit.lessons.forEach((lesson,li)=>{
        lesson.id = `${subKey}-u${ui}-l${li}`;
        lesson.unitIndex = ui;
        lesson.lessonIndex = li;
      });
    });
  });
})();
