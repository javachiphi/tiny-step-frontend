import section1Image from '../../../public/images/section1.png'
import section3Image from '../../../public/images/section3.png'
// import section2Reflect from '../../../public/images/reflect.png'
import section2Mental from '../../../public/images/mental.png'
import section2Situation from '../../../public/images/situation.png'

const sectionData = [
  {
    heading: 'Stop Living Life on Autopilot. Take Tiny Steps.',
    content:
      'Daily routines often run on unnoticed habits. From perfectionism to overthinking, these patterns shape our lives. Tiny Steps makes them visible.',
    backgroundColor: '#52b6de', // #86D1AC green
    imageUrl: section1Image,
    imagePosition: 'right',
  },
  {
    heading: 'From Autopilot to Mindful Actions',
    content: 'Track, reflect, remind to navigate your unique tendencies',
    backgroundColor: '#F9B917',
    images: [
      {
        url: section2Situation,
        title: 'Avoid Autopilot',
        subtitle:
          "Avoid Autopilot: Spot improvement areas in life's corners. Test new methods.",
        // description:
        // 'coding has multiple areas of improvement. Before coding, one can review tendencies and try different approaches.',
      },
      {
        url: section2Mental,
        title: 'Know Yourself',
        subtitle:
          'Know Yourself: Track when habits emerge across scenarios. Grow in awareness.',
        // description:
        // 'prioritization is an issue seen in coding and family. If so then, this issue might be affecting other areas of life.',
      },
      // { url: section2Reflect, description: 'Image description 3' },
    ],
    imagePosition: 'column',
  },
  {
    heading: 'How Tiny Steps Works',
    content: [
      {
        title: 'Track',
        subtitle: ' Log moments of default behavior or thoughts.',
      },
      {
        title: 'Reflect',
        subtitle: 'Look at your notes. Find patterns. Plan better responses.',
      },
      {
        title: 'Remind',
        subtitle: 'Use the app to guide you in similar situations.',
      },
    ],
    backgroundColor: '#86D1AC',
    isNumberedList: true,
    imageUrl: section3Image,
    imagePosition: 'left',
  },
]

export default sectionData
