import { QuestionnaireData } from '../types';

export const questionData: QuestionnaireData = {
  part1: [
    {
      id: "1.1",
      category: "Cognitive Impairment",
      question: "Over the past week, have you had problems remembering things, following conversations, paying attention, thinking clearly, or finding your way around the house or in town?",
      options: [
        "0: Normal: No cognitive impairment.",
        "1: Slight: Impairment appreciated by patient or caregiver with no concrete interference.",
        "2: Mild: Clinically evident cognitive dysfunction, but only minimal interference.",
        "3: Moderate: Cognitive deficits interfere with but do not preclude normal activities.",
        "4: Severe: Cognitive dysfunction precludes the patient's ability to carry out normal activities."
      ]
    },
    {
      id: "1.2",
      category: "Hallucinations and Psychosis",
      question: "Over the past week, have you seen, heard, smelled, or felt things that were not really there?",
      options: [
        "0: Normal: No hallucinations.",
        "1: Slight: Illusions or non-formed hallucinations, but patient recognizes them.",
        "2: Mild: Formed hallucinations independent of environmental stimuli.",
        "3: Moderate: Formed hallucinations with loss of insight.",
        "4: Severe: Patient has delusions or paranoia."
      ]
    },
    {
      id: "1.3",
      category: "Depressed Mood",
      question: "Over the past week, have you felt low, sad, hopeless, or unable to enjoy things?",
      options: [
        "0: Normal: No depressed mood.",
        "1: Slight: Episodes not sustained for more than one day at a time.",
        "2: Mild: Depressed mood that is sustained over days, but without interference.",
        "3: Moderate: Depressed mood that interferes with normal activities.",
        "4: Severe: Depressed mood precludes patient's ability to carry out normal activities."
      ]
    },
    {
      id: "1.4",
      category: "Anxious Mood",
      question: "Over the past week, have you felt nervous, worried, or tense?",
      options: [
        "0: Normal: No anxious feelings.",
        "1: Slight: Anxious feelings present but not sustained for more than one day.",
        "2: Mild: Anxious feelings are sustained over more than one day, but without interference.",
        "3: Moderate: Anxious feelings interfere with normal activities.",
        "4: Severe: Anxious feelings preclude patient's ability to carry out normal activities."
      ]
    },
    {
      id: "1.5",
      category: "Apathy",
      question: "Over the past week, have you felt indifferent to doing activities or being with people?",
      options: [
        "0: Normal: No apathy.",
        "1: Slight: Apathy appreciated by patient/caregiver, but no interference.",
        "2: Mild: Apathy interferes with isolated activities.",
        "3: Moderate: Apathy interferes with most activities.",
        "4: Severe: Passive and withdrawn, complete loss of initiative."
      ]
    },
    {
      id: "1.6",
      category: "Dopamine Dysregulation",
      question: "Over the past week, have you had unusually strong urges that are hard to control? (e.g., gambling, cleaning, obsessing about food/sex)",
      options: [
        "0: Normal: No problems present.",
        "1: Slight: Problems present but usually do not cause difficulties.",
        "2: Mild: Problems present and usually cause a few difficulties.",
        "3: Moderate: Problems present and usually cause a lot of difficulties.",
        "4: Severe: Problems preclude patient's ability to carry out normal activities."
      ]
    },
    {
      id: "1.7",
      category: "Sleep Problems",
      question: "Over the past week, have you had trouble going to sleep at night or staying asleep through the night?",
      options: [
        "0: Normal: No problems.",
        "1: Slight: Sleep problems present but do not cause trouble getting a full night of sleep.",
        "2: Mild: Sleep problems usually cause some difficulties getting a full night of sleep.",
        "3: Moderate: Sleep problems cause a lot of difficulties, but I still usually sleep for more than half the night.",
        "4: Severe: I usually do not sleep for most of the night."
      ]
    },
    {
      id: "1.8",
      category: "Daytime Sleepiness",
      question: "Over the past week, have you had trouble staying awake during the daytime?",
      options: [
        "0: Normal: No daytime sleepiness.",
        "1: Slight: Daytime sleepiness occurs, but I can resist and stay awake.",
        "2: Mild: Sometimes I fall asleep when alone and relaxing.",
        "3: Moderate: I sometimes fall asleep when I should not (e.g., eating, talking).",
        "4: Severe: I often fall asleep when I should not."
      ]
    },
    {
      id: "1.9",
      category: "Pain and Other Sensations",
      question: "Over the past week, have you had uncomfortable feelings in your body like pain, aches, tingling, or cramps?",
      options: [
        "0: Normal: No uncomfortable feelings.",
        "1: Slight: I have these feelings, but I can do things without difficulty.",
        "2: Mild: These feelings cause some problems when I do things.",
        "3: Moderate: These feelings cause a lot of problems, but do not stop me.",
        "4: Severe: These feelings stop me from doing things."
      ]
    },
    {
      id: "1.10",
      category: "Urinary Problems",
      question: "Over the past week, have you had trouble with urine control?",
      options: [
        "0: Normal: No urine control problems.",
        "1: Slight: I need to urinate often or urgently.",
        "2: Mild: Urine problems cause some difficulties with daily activities.",
        "3: Moderate: Urine problems cause a lot of difficulties, including accidents.",
        "4: Severe: I cannot control my urine."
      ]
    },
    {
      id: "1.11",
      category: "Constipation Problems",
      question: "Over the past week, have you had constipation troubles that cause you difficulty moving your bowels?",
      options: [
        "0: Normal: No constipation.",
        "1: Slight: I use extra effort to move my bowels.",
        "2: Mild: Constipation causes me to have some troubles doing things.",
        "3: Moderate: Constipation causes me to have a lot of trouble doing things.",
        "4: Severe: I usually need physical help from someone else to empty my bowels."
      ]
    },
    {
      id: "1.12",
      category: "Lightheadedness on Standing",
      question: "Over the past week, have you felt faint, dizzy, or foggy when you stand up after sitting or lying down?",
      options: [
        "0: Normal: No dizzy or foggy feelings.",
        "1: Slight: Dizzy or foggy feelings occur, but do not cause troubles.",
        "2: Mild: Dizzy or foggy feelings cause me to hold on to something.",
        "3: Moderate: Dizzy or foggy feelings cause me to sit or lie down to avoid fainting.",
        "4: Severe: Dizzy or foggy feelings cause me to fall or faint."
      ]
    },
    {
      id: "1.13",
      category: "Fatigue",
      question: "Over the past week, have you usually felt fatigued? (This feeling is not part of being sleepy or sad)",
      options: [
        "0: Normal: No fatigue.",
        "1: Slight: Fatigue occurs, but does not cause troubles.",
        "2: Mild: Fatigue causes me some troubles doing things.",
        "3: Moderate: Fatigue causes me a lot of troubles doing things.",
        "4: Severe: Fatigue stops me from doing things."
      ]
    }
  ],
  part2: [
    {
      id: "2.1",
      category: "Speech",
      question: "Over the past week, have you had problems with your speech?",
      options: [
        "0: Normal: Not at all.",
        "1: Slight: Speech is soft/slurred but no need to repeat.",
        "2: Mild: People ask me to occasionally repeat myself.",
        "3: Moderate: People ask me to repeat myself every day.",
        "4: Severe: Most or all of my speech cannot be understood."
      ]
    },
    {
      id: "2.2",
      category: "Saliva and Drooling",
      question: "Over the past week, have you usually had too much saliva during when you are awake or when you sleep?",
      options: [
        "0: Normal: Not at all.",
        "1: Slight: Too much saliva, but do not drool.",
        "2: Mild: Drooling during sleep, but none when awake.",
        "3: Moderate: Drooling when awake, but usually do not need tissues.",
        "4: Severe: Drooling requires regular use of tissues."
      ]
    },
    {
      id: "2.3",
      category: "Chewing and Swallowing",
      question: "Over the past week, have you usually had problems swallowing pills or eating meals?",
      options: [
        "0: Normal: No problems.",
        "1: Slight: Aware of slowness, but do not choke.",
        "2: Mild: Need pills cut or food specially prepared.",
        "3: Moderate: Choked at least once in the past week.",
        "4: Severe: Need a feeding tube."
      ]
    },
    {
      id: "2.4",
      category: "Eating Tasks",
      question: "Over the past week, have you usually had troubles handling your food and using eating utensils?",
      options: [
        "0: Normal: Not at all.",
        "1: Slight: Slow, but do not need help.",
        "2: Mild: Slow and occasional spills; need help with a few tasks.",
        "3: Moderate: Need help with many eating tasks.",
        "4: Severe: Need help for most or all eating tasks."
      ]
    },
    {
      id: "2.5",
      category: "Dressing",
      question: "Over the past week, have you usually had problems dressing?",
      options: [
        "0: Normal: Not at all.",
        "1: Slight: Slow, but do not need help.",
        "2: Mild: Slow and need help for a few tasks (buttons, zippers).",
        "3: Moderate: Need help for many dressing tasks.",
        "4: Severe: Need help for most or all dressing tasks."
      ]
    },
    {
      id: "2.6",
      category: "Hygiene",
      question: "Over the past week, have you usually been slow or do you need help with washing, bathing, shaving, brushing teeth, etc?",
      options: [
        "0: Normal: Not at all.",
        "1: Slight: Slow, but do not need help.",
        "2: Mild: Need help with some hygiene tasks.",
        "3: Moderate: Need help for many hygiene tasks.",
        "4: Severe: Need help for most or all hygiene tasks."
      ]
    },
    {
      id: "2.7",
      category: "Handwriting",
      question: "Over the past week, have people usually had trouble reading your handwriting?",
      options: [
        "0: Normal: Not at all.",
        "1: Slight: Writing is slow/clumsy, but all words are clear.",
        "2: Mild: Some words are unclear and difficult to read.",
        "3: Moderate: Many words are unclear and difficult to read.",
        "4: Severe: Most or all words cannot be read."
      ]
    },
    {
      id: "2.8",
      category: "Hobbies",
      question: "Over the past week, have you usually had trouble doing your hobbies or other things that you like to do?",
      options: [
        "0: Normal: Not at all.",
        "1: Slight: A bit slow but do these activities easily.",
        "2: Mild: Some difficulty doing these activities.",
        "3: Moderate: Major problems doing these activities, but still do most.",
        "4: Severe: Unable to do most or all of these activities."
      ]
    },
    {
      id: "2.9",
      category: "Turning in Bed",
      question: "Over the past week, do you usually have trouble turning over in bed?",
      options: [
        "0: Normal: Not at all.",
        "1: Slight: A bit of trouble, but do not need help.",
        "2: Mild: A lot of trouble, need occasional help.",
        "3: Moderate: Often need help.",
        "4: Severe: Unable to turn over without help."
      ]
    },
    {
      id: "2.10",
      category: "Tremor",
      question: "Over the past week, have you usually had shaking or tremor?",
      options: [
        "0: Normal: Not at all.",
        "1: Slight: Tremor occurs but does not cause problems.",
        "2: Mild: Tremor causes problems with only a few activities.",
        "3: Moderate: Tremor causes problems with many daily activities.",
        "4: Severe: Tremor causes problems with most or all activities."
      ]
    },
    {
      id: "2.11",
      category: "Getting out of Bed/Chair",
      question: "Over the past week, have you usually had trouble getting out of bed, a car seat, or a deep chair?",
      options: [
        "0: Normal: Not at all.",
        "1: Slight: Slow or awkward, but can do it on first try.",
        "2: Mild: Need more than one try or occasional help.",
        "3: Moderate: Sometimes need help, but most times can do it alone.",
        "4: Severe: Need help most or all of the time."
      ]
    },
    {
      id: "2.12",
      category: "Walking and Balance",
      question: "Over the past week, have you usually had problems with balance and walking?",
      options: [
        "0: Normal: Not at all.",
        "1: Slight: Slightly slow or drag a leg.",
        "2: Mild: Occasionally use a walking aid, but no help from person.",
        "3: Moderate: Usually use a walking aid (cane, walker).",
        "4: Severe: Usually use the support of another person."
      ]
    },
    {
      id: "2.13",
      category: "Freezing",
      question: "Over the past week, on your usual day when walking, do you suddenly stop or freeze as if your feet are stuck to the floor?",
      options: [
        "0: Normal: Not at all.",
        "1: Slight: Briefly freeze, but can easily start again.",
        "2: Mild: Freeze and have trouble starting again, but no help needed.",
        "3: Moderate: Freezing requires walking aid or help.",
        "4: Severe: Because of freezing, need help most or all of the time."
      ]
    }
  ]
};
