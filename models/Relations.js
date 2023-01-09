const User = require("./User");
const UserSession = require("./UserSession");
const EmailVerification = require("./EmailVerification");
const SiteLogo = require("./SiteLogo");
const UserProfile = require("./UserProfile");
const Game = require("./Game");
const Timezone = require("./Timezone");
const Role = require("./Role");
const Platform = require("./Platform");
const GameProfile = require("./GameProfile");
const Match = require("./Match");
const SkillLevel = require("./SkillLevel");
const GameProfileConfig = require("./GameProfileConfig");
const GameProfileConfigOptions = require("./GameProfileConfigOptions");
const MatchConfig = require("./MatchConfig");
const MatchResult = require("./MatchResult");
const UserGameStats = require("./UserGameStats");
const SubmittedMatchResult = require("./SubmittedMatchResult");
const UserWinCount = require("./UserWinCount");
const LeaderboardHistory = require("./LeaderboardHistory");
const WeeklyLeaderboardHistory = require("./WeeklyLeaderboardHistory");
const BestOf = require("./BestOf");
const MatchStartTime = require("./MatchStartTime");
const ChatRoom = require("./ChatRoom");
const ChatMember = require("./ChatMember");
const ChatMessage = require("./ChatMessage");
const UserRole = require("./UserRoles");
const UserMatch = require("./UserMatch");
const MatchRequest = require("./MatchRequest");
const GamePlatform = require("./GamePlatform");
const CreditCustodian = require("./CreditCustodian");
const Transaction = require("./transaction");
const TransactionDetail = require("./transaction_detail");
const NotificationDetail = require("./NotificationDetail");
const Notification = require("./Notification");
const Notifier = require("./Notifier");
const DisputeRoom = require("./DisputeRoom");
const NotificationEntityType = require("./NotificationEntityType");
const DisputeChatMember = require("./DisputeChatMember");
const Ticket = require("./Ticket");
const TicketType = require("./TicketType");
const UserTicket = require("./UserTicket");

User.hasMany(UserSession);
UserSession.belongsTo(User);

User.hasOne(EmailVerification);
EmailVerification.belongsTo(User);

User.hasOne(UserProfile);
UserProfile.belongsTo(User);

User.belongsToMany(Role, { through: UserRole });
Role.belongsToMany(User, { through: UserRole });

Game.hasOne(GameProfile);
GameProfile.belongsTo(Game);

Game.belongsToMany(Platform, { through: GamePlatform });
Platform.belongsToMany(Game, { through: GamePlatform });

GameProfile.belongsToMany(Timezone, { through: "game_regions" });
Timezone.belongsToMany(GameProfile, { through: "game_regions" });

GameProfile.hasMany(Match);
Match.belongsTo(GameProfile);

Match.belongsToMany(User, { through: UserMatch });
User.belongsToMany(Match, { through: UserMatch });

Match.belongsTo(User, { as: "created_by" });

Match.belongsTo(User, { as: "start_request_by_player" });

Match.belongsTo(User, { as: "rejected_by_player" });

Match.belongsTo(User, { as: "accepted_by_player" });

Platform.hasMany(Match);
Match.belongsTo(Platform);

SkillLevel.hasMany(Match);
Match.belongsTo(SkillLevel);

GameProfile.hasMany(GameProfileConfig);
GameProfileConfig.belongsTo(GameProfile);

GameProfileConfig.hasMany(GameProfileConfigOptions);
GameProfileConfigOptions.belongsTo(GameProfileConfig);

Match.belongsToMany(GameProfileConfigOptions, { through: MatchConfig });
GameProfileConfigOptions.belongsToMany(Match, { through: MatchConfig });

Match.hasOne(MatchResult);
MatchResult.belongsTo(Match);

MatchResult.belongsTo(User, { as: "winner" });

// SkillLevel.hasMany(UserGameStats);
// UserGameStats.belongsTo(SkillLevel);

GameProfile.hasMany(UserGameStats);
UserGameStats.belongsTo(GameProfile);

User.hasMany(UserGameStats);
UserGameStats.belongsTo(User);

Match.hasOne(SubmittedMatchResult);
SubmittedMatchResult.belongsTo(Match);

SubmittedMatchResult.belongsTo(User, { as: "player1" });
SubmittedMatchResult.belongsTo(User, { as: "player2" });

User.hasMany(UserWinCount);
UserWinCount.belongsTo(User);

GameProfile.hasMany(UserWinCount);
UserWinCount.belongsTo(GameProfile);

User.hasMany(LeaderboardHistory);
LeaderboardHistory.belongsTo(User);

User.hasMany(WeeklyLeaderboardHistory);
WeeklyLeaderboardHistory.belongsTo(User);

BestOf.hasMany(Match);
Match.belongsTo(BestOf);

MatchStartTime.hasMany(Match);
Match.belongsTo(MatchStartTime);

ChatRoom.hasMany(ChatMember);
ChatMember.belongsTo(ChatRoom);

User.hasMany(ChatMember);
ChatMember.belongsTo(User);

ChatMember.hasMany(ChatMessage);
ChatMessage.belongsTo(ChatMember);

ChatRoom.hasMany(ChatMessage);
ChatMessage.belongsTo(ChatRoom);

Match.hasOne(ChatRoom);
ChatRoom.belongsTo(Match);

Match.hasMany(MatchRequest);
MatchRequest.belongsTo(Match);

User.hasMany(MatchRequest);
MatchRequest.belongsTo(User);

Match.hasOne(CreditCustodian);
CreditCustodian.belongsTo(Match);

CreditCustodian.belongsTo(UserProfile, { as: "player1_profile" });
CreditCustodian.belongsTo(UserProfile, { as: "player2_profile" });

Transaction.hasMany(TransactionDetail);
TransactionDetail.belongsTo(Transaction);

Timezone.hasMany(User);
User.belongsTo(Timezone);

NotificationDetail.hasMany(Notification);
Notification.belongsTo(NotificationDetail);
Notification.belongsTo(UserProfile, { as: "receiver" });

NotificationDetail.hasOne(Notifier);
Notifier.belongsTo(NotificationDetail);
Notifier.belongsTo(UserProfile, { as: "notifier" });

NotificationEntityType.hasMany(NotificationDetail);
NotificationDetail.belongsTo(NotificationEntityType);

Match.hasOne(DisputeRoom);
DisputeRoom.belongsTo(Match);

DisputeRoom.hasMany(DisputeChatMember);
DisputeChatMember.belongsTo(DisputeRoom);

User.hasMany(DisputeChatMember);
DisputeChatMember.belongsTo(User);

DisputeChatMember.hasMany(ChatMessage);
ChatMessage.belongsTo(DisputeChatMember);

DisputeRoom.hasMany(ChatMessage);
ChatMessage.belongsTo(DisputeRoom);

TicketType.hasMany(Ticket);
Ticket.belongsTo(TicketType);

Ticket.belongsToMany(User, { through: UserTicket });
User.belongsToMany(Ticket, { through: UserTicket });
