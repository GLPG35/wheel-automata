import { create } from 'zustand'
import amp_bgm_00_0 from '../assets/amusement_park/bgm_00_0.opus'
import amp_bgm_00_1 from '../assets/amusement_park/bgm_00_1.opus'
import amp_bgm_01_0 from '../assets/amusement_park/bgm_01_0.opus'
import amp_bgm_01_1 from '../assets/amusement_park/bgm_01_1.opus'
import amp_bgm_02_0 from '../assets/amusement_park/bgm_02_0.opus'
import amp_bgm_02_1 from '../assets/amusement_park/bgm_02_1.opus'
import amp_bgm_03_0 from '../assets/amusement_park/bgm_03_0.opus'
import amp_bgm_03_1 from '../assets/amusement_park/bgm_03_1.opus'
import amp_vcc_00_0 from '../assets/amusement_park/vcc_00_0.opus'
import amp_vcc_00_1 from '../assets/amusement_park/vcc_00_1.opus'
import vnr_bgm_00_0 from '../assets/voice_of_no_return/bgm_00_0.opus'
import vnr_bgm_00_1 from '../assets/voice_of_no_return/bgm_00_1.opus'
import vnr_bgm_01_0 from '../assets/voice_of_no_return/bgm_01_0.opus'
import vnr_bgm_01_1 from '../assets/voice_of_no_return/bgm_01_1.opus'
import vnr_vcc_00_0 from '../assets/voice_of_no_return/vcc_00_0.opus'
import vnr_vcc_00_1 from '../assets/voice_of_no_return/vcc_00_1.opus'
import pfs_bgm_00_0 from '../assets/peaceful_sleep/bgm_00_0.opus'
import pfs_bgm_00_1 from '../assets/peaceful_sleep/bgm_00_1.opus'
import pfs_bgm_01_0 from '../assets/peaceful_sleep/bgm_01_0.opus'
import pfs_bgm_01_1 from '../assets/peaceful_sleep/bgm_01_1.opus'
import pfs_bgm_02_0 from '../assets/peaceful_sleep/bgm_02_0.opus'
import pfs_bgm_02_1 from '../assets/peaceful_sleep/bgm_02_1.opus'
import crl_bgm_00_0 from '../assets/city_ruins_light/bgm_00_0.opus'
import crl_bgm_00_1 from '../assets/city_ruins_light/bgm_00_1.opus'
import crl_bgm_01_0 from '../assets/city_ruins_light/bgm_01_0.opus'
import crl_bgm_01_1 from '../assets/city_ruins_light/bgm_01_1.opus'
import crl_bgm_02_0 from '../assets/city_ruins_light/bgm_02_0.opus'
import crl_bgm_02_1 from '../assets/city_ruins_light/bgm_02_1.opus'
import crl_bgm_03_0 from '../assets/city_ruins_light/bgm_03_0.opus'
import crl_bgm_03_1 from '../assets/city_ruins_light/bgm_03_1.opus'
import crl_vcc_00_0 from '../assets/city_ruins_light/vcc_00_0.opus'
import crl_vcc_00_1 from '../assets/city_ruins_light/vcc_00_1.opus'
import crs_bgm_00_0 from '../assets/city_ruins_shade/bgm_00_0.opus'
import crs_bgm_00_1 from '../assets/city_ruins_shade/bgm_00_1.opus'
import crs_bgm_01_0 from '../assets/city_ruins_shade/bgm_01_0.opus'
import crs_bgm_01_1 from '../assets/city_ruins_shade/bgm_01_1.opus'
import crs_bgm_02_0 from '../assets/city_ruins_shade/bgm_02_0.opus'
import crs_bgm_02_1 from '../assets/city_ruins_shade/bgm_02_1.opus'
import crs_vcc_00_0 from '../assets/city_ruins_shade/vcc_00_0.opus'
import crs_vcc_00_1 from '../assets/city_ruins_shade/vcc_00_1.opus'
import psc_bgm_00_0 from '../assets/pascal/bgm_00_0.opus'
import psc_bgm_00_1 from '../assets/pascal/bgm_00_1.opus'
import psc_bgm_01_0 from '../assets/pascal/bgm_01_0.opus'
import psc_bgm_01_1 from '../assets/pascal/bgm_01_1.opus'
import cpc_bgm_00_0 from '../assets/copied_city/bgm_00_0.opus'
import cpc_bgm_00_1 from '../assets/copied_city/bgm_00_1.opus'
import cpc_bgm_01_0 from '../assets/copied_city/bgm_01_0.opus'
import cpc_bgm_01_1 from '../assets/copied_city/bgm_01_1.opus'
import cpc_bgm_02_0 from '../assets/copied_city/bgm_02_0.opus'
import cpc_bgm_02_1 from '../assets/copied_city/bgm_02_1.opus'
import mod_bgm_00_0 from '../assets/memories_of_dust/bgm_00_0.opus'
import mod_bgm_00_1 from '../assets/memories_of_dust/bgm_00_1.opus'
import mod_bgm_01_0 from '../assets/memories_of_dust/bgm_01_0.opus'
import mod_bgm_01_1 from '../assets/memories_of_dust/bgm_01_1.opus'
import mod_bgm_02_0 from '../assets/memories_of_dust/bgm_02_0.opus'
import mod_bgm_02_1 from '../assets/memories_of_dust/bgm_02_1.opus'
import mod_bgm_03_0 from '../assets/memories_of_dust/bgm_03_0.opus'
import mod_bgm_03_1 from '../assets/memories_of_dust/bgm_03_1.opus'
import mod_vcc_00_0 from '../assets/memories_of_dust/vcc_00_0.opus'
import mod_vcc_00_1 from '../assets/memories_of_dust/vcc_00_1.opus'
import frk_bgm_00_0 from '../assets/forest_kingdom/bgm_00_0.opus'
import frk_bgm_00_1 from '../assets/forest_kingdom/bgm_00_1.opus'
import frk_bgm_01_0 from '../assets/forest_kingdom/bgm_01_0.opus'
import frk_bgm_01_1 from '../assets/forest_kingdom/bgm_01_1.opus'
import frk_bgm_02_0 from '../assets/forest_kingdom/bgm_02_0.opus'
import frk_bgm_02_1 from '../assets/forest_kingdom/bgm_02_1.opus'
import frk_bgm_03_0 from '../assets/forest_kingdom/bgm_03_0.opus'
import frk_bgm_03_1 from '../assets/forest_kingdom/bgm_03_1.opus'
import frk_vcc_00_0 from '../assets/forest_kingdom/vcc_00_0.opus'
import frk_vcc_00_1 from '../assets/forest_kingdom/vcc_00_1.opus'
import wrw_bgm_00_0 from '../assets/wretched_weaponry/bgm_00_0.opus'
import wrw_bgm_00_1 from '../assets/wretched_weaponry/bgm_00_1.opus'
import wrw_bgm_01_0 from '../assets/wretched_weaponry/bgm_01_0.opus'
import wrw_bgm_01_1 from '../assets/wretched_weaponry/bgm_01_1.opus'
import wrw_bgm_02_0 from '../assets/wretched_weaponry/bgm_02_0.opus'
import wrw_bgm_02_1 from '../assets/wretched_weaponry/bgm_02_1.opus'
import wrw_bgm_03_0 from '../assets/wretched_weaponry/bgm_03_0.opus'
import wrw_bgm_03_1 from '../assets/wretched_weaponry/bgm_03_1.opus'
import wrw_vcc_00_0 from '../assets/wretched_weaponry/vcc_00_0.opus'
import wrw_vcc_00_1 from '../assets/wretched_weaponry/vcc_00_1.opus'
import fof_bgm_00_0 from '../assets/fortress_of_lies/bgm_00_0.opus'
import fof_bgm_00_1 from '../assets/fortress_of_lies/bgm_00_1.opus'
import fof_bgm_01_0 from '../assets/fortress_of_lies/bgm_01_0.opus'
import fof_bgm_01_1 from '../assets/fortress_of_lies/bgm_01_1.opus'
import amf_bgm_00_0 from '../assets/alien_manifestation/bgm_00_0.opus'
import amf_bgm_00_1 from '../assets/alien_manifestation/bgm_00_1.opus'
import amf_bgm_01_0 from '../assets/alien_manifestation/bgm_01_0.opus'
import amf_bgm_01_1 from '../assets/alien_manifestation/bgm_01_1.opus'
import amf_bgm_02_0 from '../assets/alien_manifestation/bgm_02_0.opus'
import amf_bgm_02_1 from '../assets/alien_manifestation/bgm_02_1.opus'
import amf_bgm_03_0 from '../assets/alien_manifestation/bgm_03_0.opus'
import amf_bgm_03_1 from '../assets/alien_manifestation/bgm_03_1.opus'
import soa_bgm_00_0 from '../assets/song_of_the_ancients/bgm_00_0.opus'
import soa_bgm_00_1 from '../assets/song_of_the_ancients/bgm_00_1.opus'
import soa_bgm_01_0 from '../assets/song_of_the_ancients/bgm_01_0.opus'
import soa_bgm_01_1 from '../assets/song_of_the_ancients/bgm_01_1.opus'
import tse_bgm_00_0 from '../assets/the_sound_of_the_end/bgm_00_0.opus'
import tse_bgm_00_1 from '../assets/the_sound_of_the_end/bgm_00_1.opus'
import tse_bgm_01_0 from '../assets/the_sound_of_the_end/bgm_01_0.opus'
import tse_bgm_01_1 from '../assets/the_sound_of_the_end/bgm_01_1.opus'
import tse_vcc_00_0 from '../assets/the_sound_of_the_end/vcc_00_0.opus'
import tse_vcc_00_1 from '../assets/the_sound_of_the_end/vcc_00_1.opus'
import ttw_bgm_00_0 from '../assets/the_tower/bgm_00_0.opus'
import ttw_bgm_00_1 from '../assets/the_tower/bgm_00_1.opus'
import ttw_bgm_01_0 from '../assets/the_tower/bgm_01_0.opus'
import ttw_bgm_01_1 from '../assets/the_tower/bgm_01_1.opus'
import ttw_bgm_02_0 from '../assets/the_tower/bgm_02_0.opus'
import ttw_bgm_02_1 from '../assets/the_tower/bgm_02_1.opus'
import ttw_bgm_03_0 from '../assets/the_tower/bgm_03_0.opus'
import ttw_bgm_03_1 from '../assets/the_tower/bgm_03_1.opus'
import ttw_vcc_00_0 from '../assets/the_tower/vcc_00_0.opus'
import ttw_vcc_00_1 from '../assets/the_tower/vcc_00_1.opus'
import vhc_bgm_00_0 from '../assets/vague_hope_cold/bgm_00_0.opus'
import vhc_bgm_00_1 from '../assets/vague_hope_cold/bgm_00_1.opus'
import vhc_bgm_01_0 from '../assets/vague_hope_cold/bgm_01_0.opus'
import vhc_bgm_01_1 from '../assets/vague_hope_cold/bgm_01_1.opus'
import { persist } from 'zustand/middleware'

export const bgmList = {
	'alien_manifestation': {
		name: 'Alien Manifestation',
		bgm: [
			{
				name: 'Vocal ver.',
				path: [
					amf_bgm_00_0,
					amf_bgm_00_1
				],
				voiced: false
			},
			{
				name: 'Simple',
				path: [
					amf_bgm_01_0,
					amf_bgm_01_1
				],
				voiced: false
			},
			{
				name: 'Vocal ver. (extended)',
				path: [
					amf_bgm_02_0,
					amf_bgm_02_1
				],
				voiced: false
			},
			{
				name: 'Simple (extended)',
				path: [
					amf_bgm_03_0,
					amf_bgm_03_1
				],
				voiced: false
			}
		],
		vcc: []
	},
	'amusement_park': {
		name: 'Amusement Park',
		bgm: [
			{
				name: 'Normal',
				path: [
					amp_bgm_00_0,
					amp_bgm_00_1
				],
				voiced: true
			},
			{
				name: 'Medium',
				path: [
					amp_bgm_01_0,
					amp_bgm_01_1
				],
				voiced: true
			},
			{
				name: 'Empty',
				path: [
					amp_bgm_02_0,
					amp_bgm_02_1
				],
				voiced: true
			},
			{
				name: 'Hacking',
				path: [
					amp_bgm_03_0,
					amp_bgm_03_1
				],
				voiced: true
			}
		],
		vcc: [
			{
				path: [
					amp_vcc_00_0,
					amp_vcc_00_1
				],
			}
		]
	},
	'city_ruins_light': {
		name: 'City Ruins (Rays of Light)',
		bgm: [
			{
				name: 'Normal',
				path: [
					crl_bgm_00_0,
					crl_bgm_00_1
				],
				voiced: true
			},
			{
				name: 'Acoustic',
				path: [
					crl_bgm_01_0,
					crl_bgm_01_1
				],
				voiced: true
			},
			{
				name: 'Empty',
				path: [
					crl_bgm_02_0,
					crl_bgm_02_1
				],
				voiced: true
			},
			{
				name: 'Hacking',
				path: [
					crl_bgm_03_0,
					crl_bgm_03_1
				],
				voiced: true
			}
		],
		vcc: [
			{
				path: [
					crl_vcc_00_0,
					crl_vcc_00_1
				]
			}
		]
	},
	'city_ruins_shade': {
		name: 'City Ruins (Shade)',
		bgm: [
			{
				name: 'Normal',
				path: [
					crs_bgm_00_0,
					crs_bgm_00_1
				],
				voiced: true
			},
			{
				name: 'Acoustic',
				path: [
					crs_bgm_01_0,
					crs_bgm_01_1
				],
				voiced: true
			},
			{
				name: 'Empty',
				path: [
					crs_bgm_02_0,
					crs_bgm_02_1
				],
				voiced: true
			}
		],
		vcc: [
			{
				path: [
					crs_vcc_00_0,
					crs_vcc_00_1
				]
			}
		]
	},
	'copied_city': {
		name: 'Copied City',
		bgm: [
			{
				name: 'Vocal ver.',
				path: [
					cpc_bgm_00_0,
					cpc_bgm_00_1
				],
				voiced: false
			},
			{
				name: 'Simple',
				path: [
					cpc_bgm_01_0,
					cpc_bgm_01_1
				],
				voiced: false
			},
			{
				name: 'Drumless',
				path: [
					cpc_bgm_02_0,
					cpc_bgm_02_1
				],
				voiced: false
			}
		],
		vcc: []
	},
	'fortress_of_lies': {
		name: 'Fortress of Lies',
		bgm: [
			{
				name: 'Vocal ver.',
				path: [
					fof_bgm_00_0,
					fof_bgm_00_1
				],
				voiced: false
			},
			{
				name: 'Simple',
				path: [
					fof_bgm_01_0,
					fof_bgm_01_1
				],
				voiced: false
			}
		],
		vcc: []
	},
	'forest_kingdom': {
		name: 'Forest Kingdom',
		bgm: [
			{
				name: 'Normal',
				path: [
					frk_bgm_00_0,
					frk_bgm_00_1
				],
				voiced: true
			},
			{
				name: 'Alternate',
				path: [
					frk_bgm_01_0,
					frk_bgm_01_1
				],
				voiced: true
			},
			{
				name: 'Empty',
				path: [
					frk_bgm_02_0,
					frk_bgm_02_1
				],
				voiced: true
			},
			{
				name: 'Hacking',
				path: [
					frk_bgm_03_0,
					frk_bgm_03_1
				],
				voiced: true
			}
		],
		vcc: [
			{
				path: [
					frk_vcc_00_0,
					frk_vcc_00_1
				],
			}
		]
	},
	'memories_of_dust': {
		name: 'Memories of Dust',
		bgm: [
			{
				name: 'Normal',
				path: [
					mod_bgm_00_0,
					mod_bgm_00_1
				],
				voiced: true
			},
			{
				name: 'Alternate',
				path: [
					mod_bgm_01_0,
					mod_bgm_01_1
				],
				voiced: true
			},
			{
				name: 'Empty',
				path: [
					mod_bgm_02_0,
					mod_bgm_02_1
				],
				voiced: true
			},
			{
				name: 'Hacking',
				path: [
					mod_bgm_03_0,
					mod_bgm_03_1
				],
				voiced: true
			}
		],
		vcc: [
			{
				path: [
					mod_vcc_00_0,
					mod_vcc_00_1
				],
			}
		]
	},
	'pascal': {
		name: 'Pascal',
		bgm: [
			{
				name: 'Vocal ver.',
				path: [
					psc_bgm_00_0,
					psc_bgm_00_1
				],
				voiced: false
			},
			{
				name: 'Simple',
				path: [
					psc_bgm_01_0,
					psc_bgm_01_1
				],
				voiced: false
			}
		],
		vcc: []
	},
	'peaceful_sleep': {
		name: 'Peaceful Sleep',
		bgm: [
			{
				name: 'Vocal ver.',
				path: [
					pfs_bgm_00_0,
					pfs_bgm_00_1
				],
				voiced: false
			},
			{
				name: 'Simple',
				path: [
					pfs_bgm_01_0,
					pfs_bgm_01_1
				],
				voiced: false
			},
			{
				name: 'Lullaby',
				path: [
					pfs_bgm_02_0,
					pfs_bgm_02_1
				],
				voiced: false
			}
		],
		vcc: []
	},
	'song_of_the_ancients': {
		name: 'Song of the Ancients (Atonement)',
		bgm: [
			{
				name: 'Vocal ver.',
				path: [
					soa_bgm_00_0,
					soa_bgm_00_1
				],
				voiced: false
			},
			{
				name: 'Simple',
				path: [
					soa_bgm_01_0,
					soa_bgm_01_1
				],
				voiced: false
			}
		],
		vcc: []
	},
	'the_sound_of_the_end': {
		name: 'The Sound of the End',
		bgm: [
			{
				name: 'Normal',
				path: [
					tse_bgm_00_0,
					tse_bgm_00_1
				],
				voiced: true
			},
			{
				name: 'Empty',
				path: [
					tse_bgm_01_0,
					tse_bgm_01_1
				],
				voiced: true
			}
		],
		vcc: [
			{
				path: [
					tse_vcc_00_0,
					tse_vcc_00_1
				]
			}
		]
	},
	'the_tower': {
		name: 'The Tower',
		bgm: [
			{
				name: 'Normal',
				path: [
					ttw_bgm_00_0,
					ttw_bgm_00_1
				],
				voiced: true
			},
			{
				name: 'Drumless',
				path: [
					ttw_bgm_01_0,
					ttw_bgm_01_1
				],
				voiced: true
			},
			{
				name: 'Empty',
				path: [
					ttw_bgm_02_0,
					ttw_bgm_02_1
				],
				voiced: true
			},
			{
				name: 'Hacking',
				path: [
					ttw_bgm_03_0,
					ttw_bgm_03_1
				],
				voiced: true
			}
		],
		vcc: [
			{
				path: [
					ttw_vcc_00_0,
					ttw_vcc_00_1
				]
			}
		]
	},
	'vague_hope_cold': {
		name: 'Vague Hope (Cold Rain)',
		bgm: [
			{
				name: 'Vocal ver.',
				path: [
					vhc_bgm_00_0,
					vhc_bgm_00_1
				],
				voiced: false
			},
			{
				name: 'Simple',
				path: [
					vhc_bgm_01_0,
					vhc_bgm_01_1
				],
				voiced: false
			}
		],
		vcc: []
	},
	'voice_of_no_return': {
		name: 'Voice of no Return',
		bgm: [
			{
				name: 'Normal',
				path: [
					vnr_bgm_00_0,
					vnr_bgm_00_1
				],
				voiced: true
			},
			{
				name: 'Acoustic',
				path: [
					vnr_bgm_01_0,
					vnr_bgm_01_1
				],
				voiced: true
			}
		],
		vcc: [
			{
				path: [
					vnr_vcc_00_0,
					vnr_vcc_00_1
				]
			}
		]
	},
	'wretched_weaponry': {
		name: 'Wretched Weaponry',
		bgm: [
			{
				name: 'Normal',
				path: [
					wrw_bgm_00_0,
					wrw_bgm_00_1
				],
				voiced: true
			},
			{
				name: 'Alternate',
				path: [
					wrw_bgm_01_0,
					wrw_bgm_01_1
				],
				voiced: true
			},
			{
				name: 'Empty',
				path: [
					wrw_bgm_02_0,
					wrw_bgm_02_1
				],
				voiced: true
			},
			{
				name: 'Hacking',
				path: [
					wrw_bgm_03_0,
					wrw_bgm_03_1
				],
				voiced: true
			}
		],
		vcc: [
			{
				path: [
					wrw_vcc_00_0,
					wrw_vcc_00_1
				]
			}
		]
	}
}

const bgmPref = Object.fromEntries(Object.entries(bgmList).map(([key, value]) => {
	const { bgm } = value
	
	return [
		key,
		{
			variant: 0,
			loaded: { bgm: bgm.map(() => false), vcc: false }
		}
	]
}))

type Element = {
	name: string
}

type AllLists = Element[]

type ListName = Element

type List = {
	[key: string]: Element[]
}

type User = {
	username: string,
	pic: number
} | undefined | null

type BgmType = keyof typeof bgmList
type Bgm = {
	name: string,
	bgm: { name: string, path: string[], voiced: boolean }[],
	vcc: { path: string[] }[]
}

interface State {
	allLists: AllLists,
	list: List,
	spinning: boolean,
	user: User,
	users: { username: string, pic: number }[],
	bgm: Bgm,
	bgmName: string,
	bgmPath: string[],
	vccPath: string[],
	bgmPreferences: {[key: string]: { variant: number, loaded: { bgm: boolean[], vcc: boolean } }},
	bgmVariant: number,
	bgmVolume: number,
	vccVolume: number,
	sfxVolume: number,
	musicMute: boolean,
	sfxMute: boolean,
	setAllLists: (list: AllLists) => void,
	addAllLists: (listName: ListName) => void,
	setList: (list: List) => void,
	addElement: (listName: string, element: Element) => void,
	deleteElement: (listName: string, elements: string[]) => void,
	setSpinning: (spinning: boolean) => void,
	setUser: (user: User) => void,
	setUsers: (users: { username: string, pic: number }[]) => void,
	setBgm: (type: BgmType) => void,
	setBgmVariant: (variant: number) => void,
	addLoadedPreference: (type: keyof typeof bgmList, index?: number) => void
	setMusicMute: (musicMute: boolean) => void,
	setSfxMute: (sfxMute: boolean) => void,
	setBgmVolume: (type: 'left' | 'right') => void,
	setSfxVolume: (type: 'left' | 'right') => void,
	setVccVolume: (type: 'left' | 'right') => void
}

export const useListStore = create<State>()(persist((set, get) => ({
	allLists: [],
	list: {},
	spinning: false,
	user: undefined,
	users: [],
	bgm: bgmList['voice_of_no_return'],
	bgmName: 'voice_of_no_return',
	bgmPreferences: bgmPref,
	bgmPath: bgmList['voice_of_no_return'].bgm[0].path,
	vccPath: bgmList['voice_of_no_return'].vcc[0].path,
	bgmVariant: 0,
	vccVariant: 0,
	bgmVolume: 30,
	vccVolume: 30,
	sfxVolume: 100,
	musicMute: true,
	sfxMute: false,
	setAllLists: (allLists) => {
		set({ allLists })
	},
	addAllLists: (listName) => {
		const { allLists } = get()

		set({ allLists: [...allLists, listName] })
	},
	setList: (list) => {
		set({ list })
	},
	addElement: (listName, element) => {
		const { list } = get()
		list[listName].push(element)
		
		set({ list })
	},
	deleteElement: (listName, elements) => {
		const { list } = get()
		list[listName] = list[listName].filter(x => !elements.includes(x.name))

		set({ list })
	},
	setSpinning: (spinning) => {
		set({ spinning })
	},
	setUser: (user => {
		set({ user })
	}),
	setUsers: (users => {
		set({ users })
	}),
	setBgm: (type => {
		const bgm = bgmList[type]
		const bgmPath =	bgm.bgm[0].path
		const vccPath = bgm.vcc.length ? bgm.vcc[0].path : []

		set({ bgm, bgmPath, vccPath, bgmName: type })
	}),
	setBgmVariant: (bgmVariant => {
		const { bgmName, bgmPreferences } = get()

		const newBgmPref = {...bgmPreferences}
		newBgmPref[bgmName].variant = bgmVariant
		
		set({ bgmVariant, bgmPreferences: newBgmPref })
	}),
	addLoadedPreference: (type, index?) => {
		const { bgmPreferences } = get()

		const newBgmPref = {...bgmPreferences}
		if (index == undefined) {
			newBgmPref[type].loaded.vcc = true
		} else {
			newBgmPref[type].loaded.bgm[index] = true
		}

		set({ bgmPreferences: newBgmPref })
	},
	setMusicMute: (musicMute => {
		set({ musicMute })
	}),
	setSfxMute: (sfxMute => {
		set({ sfxMute })
	}),
	setBgmVolume: (type => {
		const { bgmVolume } = get()
		
		if (type == 'left') {
			set({ bgmVolume: bgmVolume - 10 < 0 ? 0 : bgmVolume - 10 })
		} else {
			set({ bgmVolume: bgmVolume + 10 > 100 ? 100 : bgmVolume + 10 })
		}
	}),
	setVccVolume: (type => {
		const { vccVolume } = get()
		
		if (type == 'left') {
			set({ vccVolume: vccVolume - 10 < 0 ? 0 : vccVolume - 10 })
		} else {
			set({ vccVolume: vccVolume + 10 > 100 ? 100 : vccVolume + 10 })
		}
	}),
	setSfxVolume: (type => {
		const { sfxVolume } = get()
		
		if (type == 'left') {
			set({ sfxVolume: sfxVolume - 10 < 0 ? 0 : sfxVolume - 10 })
		} else {
			set({ sfxVolume: sfxVolume + 10 > 100 ? 100 : sfxVolume + 10 })
		}
	})
}),{ name: 'listStorage', partialize: (state) => ({
	sfxVolume: state.sfxVolume,
	bgmVolume: state.bgmVolume,
	vccVolume: state.vccVolume,
	bgm: state.bgm,
	bgmName: state.bgmName,
	bgmPath: state.bgmPath,
	vccPath: state.vccPath,
	bgmVariant: state.bgmVariant,
	sfxMute: state.sfxMute,
	bgmPreferences: Object.fromEntries(Object.entries(state.bgmPreferences).map(([key, value]) => {
		const { variant, loaded: { bgm } } = value
	
		return [
			key,
			{
				variant,
				loaded: { bgm: bgm.map(() => false), vcc: false }
			}
		]
	}))
})}))