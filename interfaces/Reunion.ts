export interface ReuinionAcces {
  ReunionTitle?: string;
  ReunionPasswordTrue?: boolean;
  ReunionPassword?: string;
}

export interface ReuinionDate {
  ReunionDateTrue?: boolean;
  ReunionDate?: string;
  ReunionTime?: string;
}
export interface ReuinionStart {
  WaitingRoome?: boolean;
  micIsDisabled?: boolean;
  cameraIsDisabled?: boolean;
}
export interface ReuinionRestrictions {
  blockAllMics?: boolean;
  blockScreenSharing?: boolean;
  blockVideo?: boolean;
  blockConversations?: boolean;
}

export interface ReuinionData
  extends ReuinionAcces,
    ReuinionDate,
    ReuinionStart,
    ReuinionRestrictions {
  ReunionData?: [];
}
