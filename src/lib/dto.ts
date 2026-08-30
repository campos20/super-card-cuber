interface CompetitorInfoPersonDto {
  name: string;
  gender: string;
  url: string;
  country: {
    id: string;
    name: string;
    continent_id: string;
    iso2: string;
  };
  location: string;
  region_id: number;
  delegate_status: string;
  email: string;
  class: string;
  teams: unknown[];
  avatar: {
    id: number;
    status: string;
    thumbnail_crop_x: number;
    thumbnail_crop_y: number;
    thumbnail_crop_w: number;
    thumbnail_crop_h: number;
    url: string;
    thumb_url: string;
    is_default: boolean;
    can_edit_thumbnail: boolean;
  };
  wca_id: string;
  country_iso2: string;
  id: string;
}

interface CompetitorInfoRecordResultDto {
  id: number;
  person_id: string;
  event_id: string;
  best: number;
  world_rank: number;
  continent_rank: number;
  country_rank: number;
}

interface CompetitorInfoPersonalRecordsDto {
  [eventId: string]: {
    single?: CompetitorInfoRecordResultDto;
    average?: CompetitorInfoRecordResultDto;
  };
}

interface CompetitorInfoMedalsDto {
  gold: number;
  silver: number;
  bronze: number;
  total: number;
}

interface CompetitorInfoRecordsDto {
  national: number;
  continental: number;
  world: number;
  total: number;
}

export interface CompetitorInfoDto {
  person: CompetitorInfoPersonDto;
  competition_count: number;
  personal_records: CompetitorInfoPersonalRecordsDto;
  medals: CompetitorInfoMedalsDto;
  records: CompetitorInfoRecordsDto;
  total_solves: number;
}
