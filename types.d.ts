/*@ts-ignore*/
type Item = any
/*@ts-ignore*/
type Number = any
/*@ts-ignore*/
type PotionEffect = any
/*@ts-ignore*/
type Particle = any
/*@ts-ignore*/
type Location = any
/*@ts-ignore*/
type Vector = any
/*@ts-ignore*/
type String = any
/*@ts-ignore*/
type StyledText = any
/*@ts-ignore*/
type Sound = any
/*@ts-ignore*/
type Variable = any
/*@ts-ignore*/
type PlayerEvent = any
/*@ts-ignore*/
type Function = any
/*@ts-ignore*/
type Process = any
declare namespace PlayerAction {
  function SetHotbar(arg1: Item): void
  function SetReducedDebug(): void
  function CloseInv(): void
  function GiveItems(arg1: Item, arg2: Number | null): void
  function NoKeepInv(): void
  function SetHandCrafting(): void
  function BossBar(): void
  function ParticleSphere(
    arg1: Particle,
    arg2: Location,
    arg3: Number | null
  ): void
  function SetVelocity(arg1: Vector): void
  function Particle(arg1: Particle, arg2: Location): void
  function AddInvRow(arg1: Item | null): void
  function NoNatRegen(): void
  function DisplayLightning(arg1: Location): void
  function Damage(
    arg1: Number,
    arg2: String | null,
    arg3: StyledText | null
  ): void
  function SendAnimation(): void
  function SetXPProg(arg1: Number): void
  function SetInventory(arg1: Item): void
  function TpSequence(arg1: Location, arg2: Number | null): void
  function Heal(arg1: Number): void
  function SetSpawnPoint(arg1: Location): void
  function SetInventoryKept(): void
  function LaunchUp(arg1: Number): void
  function GetTargetEntity(): void
  function ForceFlight(): void
  function LoadInv(): void
  function ChatStyle(arg1: StyledText): void
  function Kick(): void
  function ProjColl(): void
  function MiscAttribute(arg1: Number | null): void
  function SpectateTarget(arg1: String, arg2: StyledText): void
  function HurtAnimation(arg1: Location | null): void
  function SurvivalMode(): void
  function DisplayBellRing(arg1: Location): void
  function SetStatus(arg1: StyledText): void
  function SetCursorItem(arg1: Item | null): void
  function SetAbsorption(arg1: Number): void
  function SetFireTicks(arg1: Number): void
  function CombatAttribute(arg1: Number | null): void
  function SetGamemode(): void
  function RemoveInvRow(arg1: Number | null): void
  function WakeUpAnimation(): void
  function DisableBlocks(): void
  function SetScoreObj(arg1: StyledText): void
  function SetHealth(): void
  function ParticleEffect(): void
  function ClearInv(): void
  function SetFreezeTicks(arg1: Number): void
  function SetGliding(): void
  function SetRotation(arg1: Number, arg2: Number): void
  function ClearItems(arg1: Item): void
  function SetFlying(): void
  function DisplayBlockOpen(arg1: Location): void
  function SetHandItem(): void
  function SendAdvancement(arg1: StyledText, arg2: Item): void
  function ClearChat(): void
  function SetMenuItem(arg1: Number, arg2: Item | null): void
  function LaunchToward(arg1: Location, arg2: Number | null): void
  function SetArmor(arg1: Item): void
  function DisplayGateway(arg1: Location): void
  function GiveSaturation(arg1: Number): void
  function DisplayEquipment(arg1: String, arg2: StyledText, arg3: Item): void
  function GiveExp(arg1: Number): void
  function FaceLocation(arg1: Location): void
  function ClearScoreboard(): void
  function ActionBar(arg1: StyledText): void
  function SetChatTag(arg1: StyledText): void
  function ShiftWorldBorder(arg1: Number, arg2: Number | null): void
  function DisplaySignText(arg1: Location, arg2: StyledText | null): void
  function SetSpeed(): void
  function ExpandInv(arg1: Item | null): void
  function LaunchProj(
    arg1: Location | null,
    arg2: StyledText | null,
    arg3: Number | null,
    arg4: Number | null
  ): void
  function NoProjColl(): void
  function ShowDisguise(): void
  function ParticleCuboidA(
    arg1: Particle,
    arg2: Location,
    arg3: Location,
    arg4: Number | null,
    arg5: Number | null
  ): void
  function PlaySound(arg1: Sound, arg2: Location | null): void
  function SetCompass(arg1: Location): void
  function RngTeleport(arg1: Location): void
  function MobDisguise(arg1: StyledText | null): void
  function EnableBlocks(): void
  function OpenBlockInv(arg1: Location): void
  function ParticleCircleA(
    arg1: Particle,
    arg2: Location,
    arg3: Number | null,
    arg4: Number | null
  ): void
  function RemoveBossBar(): void
  function SetEquipment(arg1: Item | null): void
  function GiveRngItem(): void
  function SetDropsEnabled(): void
  function SendToPlot(arg1: String): void
  function RemovePotion(arg1: PotionEffect): void
  function DisplayFracture(arg1: Location, arg2: Number | null): void
  function SetEntityHidden(arg1: String, arg2: StyledText): void
  function SetSidebar(): void
  function AllowDrops(): void
  function Vibration(arg1: Location, arg2: Location, arg3: Number | null): void
  function SetSlot(arg1: Number): void
  function ParticleRay(
    arg1: Particle,
    arg2: Location,
    arg3: Vector,
    arg4: Number | null
  ): void
  function ParticleCuboid(
    arg1: Particle,
    arg2: Location,
    arg3: Location,
    arg4: Number | null
  ): void
  function SendMessageSeq(arg1: StyledText, arg2: Number | null): void
  function SetNamePrefix(arg1: StyledText | null): void
  function ClearDispBlock(arg1: Location, arg2: Location | null): void
  function SetRainLevel(arg1: Number, arg2: Number): void
  function Undisguise(): void
  function ParticleSpiralA(
    arg1: Particle,
    arg2: Location,
    arg3: Number | null,
    arg4: Number | null,
    arg5: Number | null,
    arg6: Number | null,
    arg7: Number | null
  ): void
  function InstantRespawn(): void
  function SetScore(arg1: StyledText, arg2: Number | null): void
  function SetNameColor(): void
  function ReachAttribute(arg1: Number | null): void
  function SetAtkSpeed(): void
  function DisablePvp(): void
  function SetTickRate(arg1: Number | null): void
  function PlayEntitySound(arg1: Sound, arg2: String, arg3: StyledText): void
  function ReplaceProj(): void
  function SetExp(arg1: Number): void
  function MiningAttribute(arg1: Number | null): void
  function KBAttribute(arg1: Number | null): void
  function MovementAttribute(arg1: Number | null): void
  function ParticleSpiral(
    arg1: Particle,
    arg2: Location,
    arg3: Number | null,
    arg4: Number | null,
    arg5: Number | null,
    arg6: Number | null
  ): void
  function FallingAttribute(arg1: Number | null): void
  function SetAllowFlight(): void
  function SetMaxHealth(arg1: Number): void
  function SetFogDistance(arg1: Number): void
  function AdventureMode(): void
  function SpectatorMode(): void
  function DispHeadTexture(arg1: Location, arg2: Item, arg3: String): void
  function ClearPotions(): void
  function SetTabListInfo(arg1: StyledText | null): void
  function EnablePvp(): void
  function HideDisguise(): void
  function ScoreLineFormat(arg1: StyledText, arg2: StyledText): void
  function SetSkin(arg1: Item): void
  function SpectatorCollision(): void
  function SetNameVisible(): void
  function SetInvulTicks(arg1: Number): void
  function EnableFlight(): void
  function SetStingsStuck(arg1: Number | null): void
  function RemoveScore(arg1: StyledText): void
  function DisallowDrops(): void
  function SetExhaustion(arg1: Number): void
  function ParticleCircle(
    arg1: Particle,
    arg2: Location,
    arg3: Number | null
  ): void
  function DisplayBlock(arg1: Location, arg2: Location | null): void
  function RideEntity(arg1: String, arg2: StyledText): void
  function WeatherRain(): void
  function RmWorldBorder(): void
  function ResourcePack(arg1: String): void
  function GiveExhaustion(arg1: Number): void
  function Teleport(arg1: Location): void
  function SetAllowPVP(): void
  function DisableFlight(): void
  function SetVisualFire(): void
  function SetDisguiseVisible(): void
  function SetArrowsStuck(arg1: Number | null): void
  function GetItemCooldown(arg1: Variable, arg2: Item): Number
  function SetItems(): void
  function KeepInv(): void
  function ReplaceItems(
    arg1: Item | null,
    arg2: Item,
    arg3: Number | null
  ): void
  function SendMessage(arg1: StyledText | null): void
  function SetSlotItem(arg1: Item | null, arg2: Number): void
  function PlaySoundSeq(
    arg1: Sound,
    arg2: Number | null,
    arg3: Location | null
  ): void
  function ParticleLineA(
    arg1: Particle,
    arg2: Location,
    arg3: Location,
    arg4: Number | null,
    arg5: Number | null
  ): void
  function Respawn(): void
  function SetInvName(): void
  function SetItemCooldown(arg1: Item, arg2: Number): void
  function SetPlayerWeather(): void
  function SendHover(): void
  function SetShoulder(): void
  function SetAirTicks(arg1: Number): void
  function DisplayPickup(
    arg1: String,
    arg2: StyledText,
    arg3: String,
    arg4: StyledText
  ): void
  function SetWorldBorder(
    arg1: Location,
    arg2: Number,
    arg3: Number | null
  ): void
  function SetPlayerTime(arg1: Number): void
  function GiveFood(arg1: Number): void
  function NatRegen(): void
  function GivePotion(arg1: PotionEffect): void
  function RemoveItems(arg1: Item): void
  function BoostElytra(arg1: Item): void
  function SaveInv(): void
  function OpenBook(arg1: Item): void
  function SetHealth(arg1: Number): void
  function BlockDisguise(arg1: StyledText | null): void
  function RollbackBlocks(arg1: Number | null): void
  function NoDeathDrops(): void
  function WalkSpeed(arg1: Number): void
  function SetCollidable(): void
  function LaunchFwd(arg1: Number): void
  function SetFallDistance(arg1: Number): void
  function CreativeMode(): void
  function AttackAnimation(): void
  function DisplayHologram(arg1: Location, arg2: StyledText): void
  function DeathDrops(): void
  function ShowInv(arg1: Item | null): void
  function SetFoodLevel(arg1: Number): void
  function PlayerDisguise(arg1: StyledText, arg2: Item | null): void
  function SetSaturation(arg1: Number): void
  function WeatherClear(): void
  function SendTitle(
    arg1: StyledText,
    arg2: StyledText | null,
    arg3: Number | null,
    arg4: Number | null,
    arg5: Number | null
  ): void
  function ScoreDefFormat(arg1: StyledText): void
  function StopSound(arg1: Sound | null): void
  function HealthAttribute(arg1: Number | null): void
  function ParticleLine(
    arg1: Particle,
    arg2: Location,
    arg3: Location,
    arg4: Number | null
  ): void
}
declare namespace SetVariable {
  function GetItemFood(arg1: Variable, arg2: Item): Number
  function String(arg1: Variable): void
  function SetParticleType(
    arg1: Variable,
    arg2: Particle | null,
    arg3: String
  ): void
  function SetItemEnchants(): void
  function ClearItemTag(arg1: Variable, arg2: Item | null): void
  function PurgeVars(arg1: String): void
  function ShiftAllAxes(
    arg1: Variable,
    arg2: Location | null,
    arg3: Number | null,
    arg4: Number | null,
    arg5: Number | null
  ): void
  function GetParticleMat(arg1: Variable, arg2: Particle): String
  function SetParticleSprd(
    arg1: Variable,
    arg2: Particle | null,
    arg3: Number,
    arg4: Number
  ): void
  function AbsoluteValue(arg1: Variable, arg2: Number | null): Number
  function AppendValue(arg1: Variable): void
  function ShiftOnVector(
    arg1: Variable,
    arg2: Location | null,
    arg3: Vector,
    arg4: Number
  ): void
  function GetItemAttribute(arg1: Variable, arg2: Item): Number
  function ClearDict(arg1: Variable): void
  function ShiftRotation(
    arg1: Variable,
    arg2: Location | null,
    arg3: Number
  ): void
  function GetItemRarity(arg1: Variable, arg2: Item): String
  function MultiplyVector(
    arg1: Variable,
    arg2: Vector | null,
    arg3: Number
  ): Vector
  function GetSignText(): void
  function Bitwise(arg1: Variable, arg2: Number, arg3: Number | null): Number
  function GetLecternPage(arg1: Variable, arg2: Location): Number
  function ParseX(): void
  function ShiftOnAxis(
    arg1: Variable,
    arg2: Location | null,
    arg3: Number
  ): void
  function ParseY(): void
  function VectorBetween(arg1: Variable, arg2: Location, arg3: Location): void
  function ParseZ(): void
  function GetVectorComp(arg1: Variable, arg2: Vector): Number
  function RmText(): void
  function AddItemAttribute(
    arg1: Variable,
    arg2: Item | null,
    arg3: Number
  ): void
  function GetCenterLoc(arg1: Variable, arg2: Location): Location
  function AlignLoc(arg1: Variable, arg2: Location | null): Location
  function GetSoundVolume(arg1: Variable, arg2: Sound): Number
  function RandomNumber(arg1: Variable, arg2: Number, arg3: Number): Number
  function ContainerName(arg1: Variable, arg2: Location): StyledText
  function Raycast(arg1: Variable, arg2: Location, arg3: Number): Location
  function RotateAroundVec(
    arg1: Variable,
    arg2: Vector | null,
    arg3: Vector,
    arg4: Number
  ): Vector
  function SetItemFood(
    arg1: Variable,
    arg2: Item | null,
    arg3: Number,
    arg4: Number,
    arg5: Number | null
  ): void
  function GetParticleMotion(arg1: Variable, arg2: Particle): Vector
  function SetParticleMotion(
    arg1: Variable,
    arg2: Particle | null,
    arg3: Vector | null,
    arg4: Number | null
  ): void
  function Average(arg1: Variable, arg2: Number): Number
  function WrapNumber(): void
  function SetY(): void
  function SetMapTexture(arg1: Variable, arg2: Item | null, arg3: String): void
  function GetBlockData(arg1: Variable, arg2: Location, arg3: String): String
  function SetX(): void
  function SortDict(arg1: Variable): void
  function GetLecternBook(arg1: Variable, arg2: Location): Item
  function GetCustomSound(arg1: Variable, arg2: Sound): String
  function CrossProduct(arg1: Variable, arg2: Vector, arg3: Vector): Vector
  function x(arg1: Variable, arg2: Number): Number
  function GetParticleRoll(arg1: Variable, arg2: Particle | null): Number
  function ParseYaw(): void
  function DotProduct(arg1: Variable, arg2: Vector, arg3: Vector): Number
  function SetZ(): void
  function SetArmorTrim(arg1: Variable, arg2: Item | null): void
  function PopListValue(arg1: Variable, arg2: Number | null): void
  function SetParticleOpac(
    arg1: Variable,
    arg2: Particle | null,
    arg3: Number
  ): void
  function Noise(
    arg1: Variable,
    arg2: Location,
    arg3: Number | null,
    arg4: Number | null,
    arg5: Number | null,
    arg6: Number | null,
    arg7: Number | null
  ): Number
  function MinNumber(arg1: Variable, arg2: Number): Number
  function GetPotionType(arg1: Variable, arg2: PotionEffect): String
  function SetItemName(): void
  function ListLength(arg1: Variable): Number
  function Sine(arg1: Variable, arg2: Number): Number
  function DirectionName(arg1: Variable, arg2: Vector): String
  function RepeatString(arg1: Variable, arg2: String, arg3: Number): String
  function GetItemLore(): void
  function JoinString(
    arg1: Variable,
    arg2: String | null,
    arg3: String | null
  ): String
  function ReverseList(arg1: Variable): void
  function DedupList(arg1: Variable): void
  function CreateDict(arg1: Variable): void
  function GetBlockByMCTag(arg1: Variable, arg2: String): void
  function RoundNumber(): void
  function FaceLocation(
    arg1: Variable,
    arg2: Location | null,
    arg3: Location
  ): Location
  function GetItemLoreLine(): void
  function SetVectorLength(
    arg1: Variable,
    arg2: Vector | null,
    arg3: Number | null
  ): void
  function SetPotionDur(
    arg1: Variable,
    arg2: PotionEffect | null,
    arg3: Number
  ): void
  function BlockResistance(arg1: Variable, arg2: Item, arg3: Location): Number
  function SplitString(arg1: Variable, arg2: String, arg3: String | null): void
  function NormalRandom(arg1: Variable, arg2: Number, arg3: Number): Number
  function SetPotionType(
    arg1: Variable,
    arg2: PotionEffect | null,
    arg3: String
  ): void
  function AlignVector(arg1: Variable, arg2: Vector | null): Vector
  function SetItemDura(arg1: Variable, arg2: Item | null, arg3: Number): void
  function SetBreakability(arg1: Variable, arg2: Item | null): void
  function SetMaxAmount(
    arg1: Variable,
    arg2: Item | null,
    arg3: Number | null
  ): void
  function RaycastEntity(): void
  function SetDictValue(arg1: Variable, arg2: String): void
  function SetAllCoords(
    arg1: Variable,
    arg2: Location | null,
    arg3: Number | null,
    arg4: Number | null,
    arg5: Number | null,
    arg6: Number | null,
    arg7: Number | null
  ): void
  function RGBColor(
    arg1: Variable,
    arg2: Number,
    arg3: Number,
    arg4: Number
  ): void
  function SetCanDestroy(arg1: Variable, arg2: Item | null): void
  function HSLColor(
    arg1: Variable,
    arg2: Number,
    arg3: Number | null,
    arg4: Number | null
  ): void
  function RemoveListIndex(arg1: Variable, arg2: Number): void
  function CellularNoise(
    arg1: Variable,
    arg2: Location,
    arg3: Number | null,
    arg4: Number | null,
    arg5: Number | null,
    arg6: Number | null,
    arg7: Number | null,
    arg8: Number | null,
    arg9: Number | null,
    arg10: Number | null,
    arg11: Number | null,
    arg12: Number | null,
    arg13: Number | null
  ): Number
  function Logarithm(arg1: Variable, arg2: Number | null, arg3: Number): Number
  function SetItemTag(
    arg1: Variable,
    arg2: Item | null,
    arg3: String,
    arg4: Number,
    arg5: String
  ): void
  function TrimString(
    arg1: Variable,
    arg2: String | null,
    arg3: Number,
    arg4: Number | null
  ): String
  function ParseMiniMessageExpr(arg1: Variable, arg2: String): StyledText
  function GetItemAmount(arg1: Variable, arg2: Item): Number
  function SetPotionAmp(
    arg1: Variable,
    arg2: PotionEffect | null,
    arg3: Number
  ): void
  function GetCanDestroy(arg1: Variable, arg2: Item): void
  function RotateAroundAxis(
    arg1: Variable,
    arg2: Vector | null,
    arg3: Number
  ): Vector
  function GetItemName(): void
  function GetItemDura(arg1: Variable, arg2: Item): Number
  function ShiftInDirection(
    arg1: Variable,
    arg2: Location | null,
    arg3: Number | null
  ): void
  function WrapNum(
    arg1: Variable,
    arg2: Number | null,
    arg3: Number,
    arg4: Number
  ): Number
  function ReplaceString(
    arg1: Variable,
    arg2: String,
    arg3: String,
    arg4: String
  ): String
  function SetItemGlowing(arg1: Variable, arg2: Item | null): void
  function SetLodestoneLoc(
    arg1: Variable,
    arg2: Item | null,
    arg3: Location
  ): void
  function FlattenList(arg1: Variable): void
  function BlockHardness(arg1: Variable, arg2: Item, arg3: Location): Number
  function GetPotionAmp(arg1: Variable, arg2: PotionEffect): Number
  function GetParticleAmount(arg1: Variable, arg2: Particle): Number
  function GetDictSize(arg1: Variable): Number
  function SetItemAmount(arg1: Variable, arg2: Item | null, arg3: Number): void
  function SubtractVectors(arg1: Variable, arg2: Vector): Vector
  function SetCase(arg1: Variable, arg2: String | null): String
  function SetParticleColor(
    arg1: Variable,
    arg2: Particle | null,
    arg3: String,
    arg4: Number | null
  ): void
  function GetLight(arg1: Variable, arg2: Location): Number
  function GetDictValues(arg1: Variable): void
  function Vector(
    arg1: Variable,
    arg2: Number,
    arg3: Number,
    arg4: Number
  ): Vector
  function Distance(arg1: Variable, arg2: Location, arg3: Location): Number
  function SetItemLore(): void
  function Root(
    arg1: Variable,
    arg2: Number | null,
    arg3: Number | null
  ): Number
  function SetParticleAmount(
    arg1: Variable,
    arg2: Particle | null,
    arg3: Number
  ): void
  function AddItemEnchant(
    arg1: Variable,
    arg2: Item | null,
    arg3: String,
    arg4: Number
  ): void
  function AddItemToolRule(
    arg1: Variable,
    arg2: Item | null,
    arg3: Number,
    arg4: String
  ): void
  function GetItemType(arg1: Variable, arg2: Item): String
  function GetDirection(arg1: Variable, arg2: Location): Vector
  function GetLoreLine(arg1: Variable, arg2: Item, arg3: Number): StyledText
  function GetParticleType(arg1: Variable, arg2: Particle): String
  function SetItemMaxDura(arg1: Variable, arg2: Item | null, arg3: Number): void
  function RemoveString(
    arg1: Variable,
    arg2: String | null,
    arg3: String
  ): String
  function GetAllBlockData(arg1: Variable, arg2: Location): String
  function MaxNumber(arg1: Variable, arg2: Number): Number
  function GetDictKeys(arg1: Variable): void
  function TrimStyledText(
    arg1: Variable,
    arg2: StyledText | null,
    arg3: Number,
    arg4: Number | null
  ): StyledText
  function SetParticleMat(
    arg1: Variable,
    arg2: Particle | null,
    arg3: Item
  ): void
  function GetCoord(arg1: Variable, arg2: Location): Number
  function RemoveItemTag(arg1: Variable, arg2: Item | null, arg3: String): void
  function SetParticleSize(
    arg1: Variable,
    arg2: Particle | null,
    arg3: Number,
    arg4: Number | null
  ): void
  function GetPotionDur(arg1: Variable, arg2: PotionEffect): Number
  function RandomLoc(arg1: Variable, arg2: Location, arg3: Location): Location
  function SetSoundType(arg1: Variable, arg2: Sound | null, arg3: String): void
  function GetLodestoneLoc(arg1: Variable, arg2: Item): Location
  function ShiftDirection(): void
  function GetContainerName(): void
  function GetParticleSprd(arg1: Variable, arg2: Particle): Number
  function ReflectVector(
    arg1: Variable,
    arg2: Vector | null,
    arg3: Vector
  ): Vector
  function GetHeadOwner(arg1: Variable, arg2: Item): String
  function GetItemEnchants(): void
  function AppendDict(arg1: Variable): void
  function GetMaxItemAmount(): void
  function GetColorChannels(arg1: Variable, arg2: String): void
  function SetListValue(arg1: Variable, arg2: Number): void
  function SetBookText(
    arg1: Variable,
    arg2: Item | null,
    arg3: StyledText,
    arg4: StyledText,
    arg5: Number
  ): void
  function RandomValue(arg1: Variable): void
  function SetItemType(arg1: Variable, arg2: Item | null, arg3: String): void
  function GetSoundType(arg1: Variable, arg2: Sound): String
  function GetListValue(arg1: Variable, arg2: Number): void
  function BounceNum(
    arg1: Variable,
    arg2: Number | null,
    arg3: Number,
    arg4: Number
  ): Number
  function Tangent(arg1: Variable, arg2: Number): Number
  function VoronoiNoise(
    arg1: Variable,
    arg2: Location,
    arg3: Number | null,
    arg4: Number | null,
    arg5: Number | null
  ): Number
  function SetDirection(): void
  function HSBColor(
    arg1: Variable,
    arg2: Number,
    arg3: Number | null,
    arg4: Number | null
  ): void
  function GetSoundVariant(arg1: Variable, arg2: Sound): String
  function GetItemColor(arg1: Variable, arg2: Item): String
  function ClearFormatting(arg1: Variable, arg2: StyledText | null): String
  function InsertListValue(arg1: Variable, arg2: Number): void
  function SetSoundVolume(
    arg1: Variable,
    arg2: Sound | null,
    arg3: Number
  ): void
  function SetCoord(arg1: Variable, arg2: Location | null, arg3: Number): void
  function AddVectors(arg1: Variable, arg2: Vector): Vector
  function SetPitch(): void
  function GetParticleFade(arg1: Variable, arg2: Particle): String
  function RaycastBlock(): void
  function SetItemTool(
    arg1: Variable,
    arg2: Item | null,
    arg3: Number | null,
    arg4: Number | null
  ): void
  function SetHeadTexture(arg1: Variable, arg2: Item | null, arg3: String): void
  function PerlinNoise(
    arg1: Variable,
    arg2: Location,
    arg3: Number | null,
    arg4: Number | null,
    arg5: Number | null,
    arg6: Number | null,
    arg7: Number | null
  ): Number
  function WorleyNoise(
    arg1: Variable,
    arg2: Location,
    arg3: Number | null,
    arg4: Number | null,
    arg5: Number | null
  ): Number
  function SetItemColor(arg1: Variable, arg2: Item | null, arg3: String): void
  function GetParticleColor(arg1: Variable, arg2: Particle): String
  function SetSoundPitch(
    arg1: Variable,
    arg2: Sound | null,
    arg3: Number,
    arg4: String
  ): void
  function GetCanPlaceOn(arg1: Variable, arg2: Item): void
  function SortList(arg1: Variable): void
  function SetCustomSound(
    arg1: Variable,
    arg2: Sound | null,
    arg3: String | null
  ): void
  function RemoveDictEntry(arg1: Variable, arg2: String): void
  function FormatTime(arg1: Variable, arg2: Number, arg3: String | null): String
  function SetItemFlags(): void
  function StringLength(arg1: Variable, arg2: String): Number
  function GetItemEffects(arg1: Variable, arg2: Item): void
  function StyledText(arg1: Variable): void
  function GetMiniMessageExpr(arg1: Variable, arg2: StyledText): String
  function SetYaw(): void
  function SetItemEffects(
    arg1: Variable,
    arg2: Item | null,
    arg3: PotionEffect
  ): void
  function GetItemTag(arg1: Variable, arg2: Item, arg3: String): void
  function CreateList(arg1: Variable): void
  function AppendList(arg1: Variable): void
  function GetContainerItems(arg1: Variable, arg2: Location): void
  function ShiftToward(
    arg1: Variable,
    arg2: Location | null,
    arg3: Location,
    arg4: Number | null
  ): void
  function TrimList(arg1: Variable, arg2: Number, arg3: Number | null): void
  function GradientNoise(
    arg1: Variable,
    arg2: Location,
    arg3: Number | null,
    arg4: Number | null,
    arg5: Number | null,
    arg6: Number | null,
    arg7: Number | null,
    arg8: Number | null,
    arg9: Number | null,
    arg10: Number | null,
    arg11: Number | null,
    arg12: Number | null,
    arg13: Number | null
  ): Number
  function SetItemHideTooltip(arg1: Variable, arg2: Item | null): void
  function GetBlockDrops(
    arg1: Variable,
    arg2: Location,
    arg3: Item | null
  ): void
  function ClearEnchants(arg1: Variable, arg2: Item | null): void
  function Cosine(arg1: Variable, arg2: Number): Number
  function GetParticleOpac(arg1: Variable, arg2: Particle | null): Number
  function GetItemByMCTag(arg1: Variable, arg2: String): void
  function SetParticleFade(
    arg1: Variable,
    arg2: Particle | null,
    arg3: String
  ): void
  function SetVectorComp(
    arg1: Variable,
    arg2: Vector | null,
    arg3: Number
  ): void
  function ParseNumber(arg1: Variable, arg2: String | null): Number
  function Exponent(
    arg1: Variable,
    arg2: Number | null,
    arg3: Number | null
  ): Number
  function ShiftAllDirs(): void
  function GetValueIndex(arg1: Variable): Number
  function RemItemEnchant(arg1: Variable, arg2: Item | null, arg3: String): void
  function AddItemLore(
    arg1: Variable,
    arg2: Item | null,
    arg3: StyledText
  ): void
  function GetBookText(): void
  function SetParticleRoll(
    arg1: Variable,
    arg2: Particle | null,
    arg3: Number
  ): void
  function SetSoundVariant(
    arg1: Variable,
    arg2: Sound | null,
    arg3: String | null
  ): void
  function ShiftLocation(): void
  function RandomizeList(arg1: Variable): void
  function ClampNumber(
    arg1: Variable,
    arg2: Number | null,
    arg3: Number,
    arg4: Number
  ): Number
  function Round(): void
  function GetSoundPitch(arg1: Variable, arg2: Sound): Number
  function TranslateColors(arg1: Variable, arg2: String | null): void
  function GetBlockGrowth(arg1: Variable, arg2: Location): Number
  function GetAllItemTags(arg1: Variable, arg2: Item): void
  function RemoveListValue(arg1: Variable): void
  function ShiftAllDirections(
    arg1: Variable,
    arg2: Location | null,
    arg3: Number | null,
    arg4: Number | null,
    arg5: Number | null
  ): void
  function ValueNoise(
    arg1: Variable,
    arg2: Location,
    arg3: Number | null,
    arg4: Number | null,
    arg5: Number | null,
    arg6: Number | null,
    arg7: Number | null,
    arg8: Number | null,
    arg9: Number | null,
    arg10: Number | null,
    arg11: Number | null,
    arg12: Number | null,
    arg13: Number | null
  ): Number
  function SetCanPlaceOn(arg1: Variable, arg2: Item | null): void
  function GetBlockType(arg1: Variable, arg2: Location): String
  function ParsePitch(): void
  function GetDictValue(arg1: Variable, arg2: String): void
  function ContainerLock(arg1: Variable, arg2: Location): String
  function GetBlockPower(arg1: Variable, arg2: Location): Number
  function GetVectorLength(arg1: Variable, arg2: Vector): Number
  function ContentLength(arg1: Variable, arg2: StyledText): Number
  function SetModelData(arg1: Variable, arg2: Item | null, arg3: Number): void
  function SetCoords(): void
  function GetMaxAmount(arg1: Variable, arg2: Item): Number
  function GetParticleSize(arg1: Variable, arg2: Particle | null): Number
}
declare namespace EntityAction {
  function DispRotationEuler(
    arg1: Number,
    arg2: Number,
    arg3: Number,
    arg4: Vector
  ): void
  function Shear(): void
  function SetVelocity(arg1: Vector): void
  function SetGlowSquidDark(arg1: Number): void
  function SetFrogType(): void
  function DispRotAxisAngle(arg1: Vector, arg2: Number): void
  function Damage(
    arg1: Number,
    arg2: String | null,
    arg3: StyledText | null
  ): void
  function SetMobSitting(): void
  function SendAnimation(): void
  function DisableGlowing(): void
  function SetWardenAnger(arg1: Number, arg2: String, arg3: StyledText): void
  function SetHorsePattern(): void
  function Heal(arg1: Number): void
  function SetPandaSadTicks(arg1: Number): void
  function SetItemOwner(): void
  function SetDyeColor(): void
  function LaunchUp(arg1: Number): void
  function SetAge(arg1: Number): void
  function NoGravity(): void
  function SetArmsRaised(): void
  function SetMoveSpeed(): void
  function SetInvulnerable(): void
  function SetFriction(): void
  function ProjColl(): void
  function ArmorStandTags(): void
  function SetPickupDelay(arg1: Number): void
  function DropItems(): void
  function MiscAttribute(arg1: Number | null): void
  function SetCreeperPower(arg1: Number): void
  function SetMarker(): void
  function RemoveCustomTag(arg1: String): void
  function SetAbsorption(arg1: Number): void
  function CreeperCharged(): void
  function SetFireTicks(arg1: Number): void
  function CombatAttribute(arg1: Number | null): void
  function SetName(arg1: StyledText): void
  function Jump(): void
  function BDisplayBlock(): void
  function SetFreezeTicks(arg1: Number): void
  function TDisplaySeeThru(): void
  function SetGliding(): void
  function SetRotation(arg1: Number, arg2: Number): void
  function SetPandaRolling(): void
  function SetFishPattern(): void
  function SetWolfType(): void
  function DispInterpolation(arg1: Number | null, arg2: Number | null): void
  function SetHandItem(): void
  function SetEndermanBlock(): void
  function LaunchToward(arg1: Location, arg2: Number | null): void
  function SetArmor(arg1: Item): void
  function GetCustomTag(arg1: Variable, arg2: String): void
  function InteractionSize(arg1: Number | null, arg2: Number | null): void
  function FaceLocation(arg1: Location): void
  function SetCatType(): void
  function SetArrowDamage(arg1: Number): void
  function DisplayScale(
    arg1: Number,
    arg2: Number,
    arg3: Number,
    arg4: Vector
  ): void
  function TDisplayAlign(): void
  function LaunchProj(
    arg1: Location | null,
    arg2: StyledText | null,
    arg3: Number | null,
    arg4: Number | null
  ): void
  function EnableAI(): void
  function DisplayBillboard(): void
  function NoProjColl(): void
  function Tame(arg1: String, arg2: StyledText): void
  function SetGoatScreaming(): void
  function SetBeeStinger(): void
  function MobDisguise(arg1: StyledText | null): void
  function SetMinecartBlock(arg1: Number | null): void
  function FoxSleeping(): void
  function SetEquipment(arg1: Item | null): void
  function SetSilenced(): void
  function SetBeeNectar(): void
  function AttachLead(arg1: String, arg2: StyledText, arg3: Location): void
  function RemovePotion(arg1: PotionEffect): void
  function ShearSheep(): void
  function ArmorStandSlots(): void
  function SetAllayDancing(): void
  function SetRabbitType(): void
  function SetSize(arg1: Number): void
  function ShowName(): void
  function SetAngry(): void
  function Undisguise(): void
  function SetDeathDrops(): void
  function SetPersistent(): void
  function ProjectileItem(arg1: Item): void
  function SetNameColor(): void
  function SetCarryingChest(): void
  function SetParrotColor(): void
  function DispTranslation(
    arg1: Number,
    arg2: Number,
    arg3: Number,
    arg4: Vector
  ): void
  function Remove(): void
  function TDispBackground(arg1: String | null, arg2: Number): void
  function DisplayCullingSize(arg1: Number | null, arg2: Number | null): void
  function HideName(): void
  function SetSheepSheared(): void
  function SetAxolotlColor(): void
  function GetAllEntityTags(arg1: Variable): void
  function SetAI(): void
  function KBAttribute(arg1: Number | null): void
  function MovementAttribute(arg1: Number | null): void
  function SetRiptiding(): void
  function SetArrowNoClip(): void
  function FallingAttribute(arg1: Number | null): void
  function SetProjSource(arg1: String, arg2: StyledText): void
  function SetFoxLeaping(): void
  function SetPandaGene(): void
  function SetMaxHealth(arg1: Number): void
  function SetFishingTime(arg1: Number): void
  function EndCrystalBeam(arg1: Location | null): void
  function FrogEat(arg1: String, arg2: StyledText): void
  function DisplayBrightness(arg1: Number, arg2: Number): void
  function SetProfession(): void
  function ClearPotions(): void
  function ArmorStandParts(): void
  function SetTarget(arg1: String, arg2: StyledText): void
  function TDisplayShadow(): void
  function SetNameVisible(): void
  function SetInvulTicks(arg1: Number): void
  function SetShulkerPeek(arg1: Number): void
  function SetRearing(): void
  function SetCloudRadius(arg1: Number, arg2: Number | null): void
  function SetGravity(): void
  function DispTPDuration(arg1: Number | null): void
  function SetWitherInvul(arg1: Number): void
  function Silence(): void
  function SetArrowPierce(arg1: Number): void
  function DisplayShadow(arg1: Number | null, arg2: Number | null): void
  function InteractResponse(): void
  function UseItem(): void
  function RideEntity(arg1: String, arg2: StyledText): void
  function DisplayMatrix(): void
  function NoDrops(): void
  function SnifferState(): void
  function EnableGlowing(): void
  function Teleport(arg1: Location): void
  function DisplayGlowColor(arg1: String): void
  function SetVisualFire(): void
  function SetArmor(): void
  function SetSaddle(): void
  function SetBulletTarget(arg1: String | null, arg2: StyledText | null): void
  function TDisplayLineWidth(arg1: Number | null): void
  function SetDragonPhase(): void
  function SetLlamaColor(): void
  function SetVillagerBiome(): void
  function SetCreeperFuse(arg1: Number): void
  function SetBaby(): void
  function MooshroomType(): void
  function SetInvisible(): void
  function SheepEat(): void
  function SetCatResting(): void
  function GivePotion(arg1: PotionEffect): void
  function SetGoatHorns(): void
  function SetGlowing(): void
  function SetPandaOnBack(): void
  function IDisplayModelType(): void
  function SetHealth(arg1: Number): void
  function BlockDisguise(arg1: StyledText | null): void
  function SetCollidable(): void
  function ArmorStandPose(
    arg1: Vector,
    arg2: Number | null,
    arg3: Number | null,
    arg4: Number | null
  ): void
  function LaunchFwd(arg1: Number): void
  function SetFallDistance(arg1: Number): void
  function MoveToLoc(arg1: Location, arg2: Number | null): void
  function TDisplayOpacity(arg1: Number | null): void
  function IDisplayItem(arg1: Item): void
  function AttackAnimation(): void
  function SnowmanPumpkin(): void
  function SetCustomTag(arg1: String, arg2: Number, arg3: String): void
  function Gravity(): void
  function DisplayViewRange(arg1: Number | null): void
  function NoAI(): void
  function PlayerDisguise(arg1: StyledText, arg2: Item | null): void
  function SetItem(arg1: Item): void
  function Explode(): void
  function SetDigging(): void
  function MoveTo(): void
  function SetArrowHitSound(arg1: Sound): void
  function SetVexCharging(): void
  function SetVillagerExp(arg1: Number): void
  function IgniteCreeper(): void
  function SetCelebrating(): void
  function TDisplayText(arg1: StyledText): void
  function SetHorseJump(arg1: Number): void
  function Unsilence(): void
  function HealthAttribute(arg1: Number | null): void
  function Ram(arg1: String, arg2: StyledText): void
  function SetFoxType(): void
}
declare namespace IfVariable {
  function ItemHasEnchant(
    arg1: Item,
    arg2: String | null,
    arg3: Number | null
  ): void
  function ItemIsBlock(arg1: Item): void
  function DictValueEquals(arg1: String): void
  function ItemHasTag(
    arg1: Item,
    arg2: String,
    arg3: Number | null,
    arg4: String | null
  ): void
  function StringMatches(arg1: String, arg2: String): void
  function ListIsEmpty(): void
  function StartsWith(arg1: String, arg2: String): void
  function ListValueEq(arg1: Number): void
  function VarIsType(): void
  function TextMatches(): void
  function IsNear(): void
  function VarExists(arg1: Variable): void
  function BlockIsSolid(): void
  function ItemEquals(arg1: Item, arg2: Item | null): void
  function ListContains(): void
  function InRange(): void
  function LocIsNear(arg1: Location, arg2: Location, arg3: Number): void
  function Contains(arg1: String, arg2: String): void
  function EndsWith(arg1: String, arg2: String): void
  function DictHasKey(arg1: String): void
}
declare namespace Control {
  function StopRepeat(): void
  function Return(): void
  function ReturnNTimes(): void
  function Skip(): void
  function End(): void
  function Wait(arg1: Number | null): void
}
declare namespace SelectObject {
  function LastMob(): void
  function RandomPlayer(arg1: Number | null): void
  function LastEntity(): void
  function Shooter(): void
  function AllMobs(): void
  function EntityName(arg1: String, arg2: StyledText): void
  function FilterRandom(arg1: Number | null): void
  function DefaultEntity(): void
  function PlayerName(arg1: String): void
  function AllEntities(): void
  function Damager(): void
  function FilterDistance(arg1: Location, arg2: Number | null): void
  function FilterRay(
    arg1: Variable | null,
    arg2: Location,
    arg3: Number,
    arg4: Number | null,
    arg5: Number | null
  ): void
  function Reset(): void
  function EventTarget(): void
  function Killer(): void
  function Victim(): void
  function EntitiesCond(): void
  function AllPlayers(): void
  function Invert(): void
  function RandomEntity(): void
  function FilterCondition(): void
  function MobsCond(): void
  function FilterSort(arg1: Number | null): void
  function Projectile(): void
  function DefaultPlayer(): void
  function PlayersCond(): void
  function MobName(): void
}
declare namespace Repeat {
  function Adjacent(arg1: Variable, arg2: Location): void
  function Path(arg1: Variable, arg2: Location, arg3: Number | null): void
  function Multiple(arg1: Variable | null, arg2: Number): void
  function Grid(arg1: Variable, arg2: Location, arg3: Location): void
  function While(): void
  function Range(): void
  function ForEach(arg1: Variable): void
  function Sphere(
    arg1: Variable,
    arg2: Location,
    arg3: Number,
    arg4: Number | null
  ): void
  function Forever(): void
  function ForEachEntry(arg1: Variable, arg2: Variable): void
}
declare namespace GameAction {
  function FillContainer(arg1: Location, arg2: Item): void
  function BreakBlock(arg1: Location): void
  function ParticleSphere(): void
  function ChangeSign(
    arg1: Location,
    arg2: Number,
    arg3: StyledText | null
  ): void
  function WebRequest(arg1: String, arg2: String | null): void
  function ClearScBoard(): void
  function HideSidebar(): void
  function SpawnItemDisplay(): void
  function WriteTransaction(arg1: Location, arg2: Location): void
  function ParticleSpiral(): void
  function SetBlockData(arg1: Location): void
  function Firework(arg1: Item, arg2: Location): void
  function SetEventDamage(arg1: Number): void
  function SpawnItem(arg1: Item, arg2: Location, arg3: StyledText | null): void
  function SignColor(arg1: Location): void
  function ShulkerBullet(arg1: Location): void
  function FireworkEffect(): void
  function SetContainer(arg1: Location, arg2: Item): void
  function SpawnInteraction(
    arg1: Location,
    arg2: Number | null,
    arg3: Number | null
  ): void
  function SetItemInSlot(arg1: Location, arg2: Item | null, arg3: Number): void
  function CloneRegion(
    arg1: Location,
    arg2: Location,
    arg3: Location,
    arg4: Location
  ): void
  function UncancelEvent(): void
  function SetLecternBook(
    arg1: Location,
    arg2: Item | null,
    arg3: Number | null
  ): void
  function SpawnArmorStand(
    arg1: Location,
    arg2: StyledText | null,
    arg3: Item | null
  ): void
  function SpawnBlockDisp(arg1: Location): void
  function ClearContainer(arg1: Location): void
  function CancelEvent(): void
  function ParticleEffect(): void
  function SpawnFangs(arg1: Location, arg2: StyledText | null): void
  function SetEventSound(arg1: Sound): void
  function SetEventXP(arg1: Number): void
  function LockContainer(arg1: Location, arg2: String | null): void
  function RemoveScore(): void
  function CreateHologram(): void
  function SetExhaustion(arg1: Number): void
  function ParticleCircle(): void
  function ClearItems(arg1: Location, arg2: Item): void
  function StartLoop(): void
  function SetFurnaceSpeed(arg1: Location, arg2: Number): void
  function BlockDropsOn(): void
  function BoneMeal(arg1: Location, arg2: Number | null): void
  function DebugStackTrace(): void
  function FallingBlock(arg1: Location): void
  function DiscordWebhook(arg1: String, arg2: String): void
  function TickBlock(arg1: Location, arg2: Number | null): void
  function ReplaceItems(
    arg1: Location,
    arg2: Item | null,
    arg3: Item,
    arg4: Number | null
  ): void
  function SetEventProj(): void
  function Explosion(arg1: Location, arg2: Number | null): void
  function SpawnMob(
    arg1: Location,
    arg2: Number | null,
    arg3: StyledText | null,
    arg4: PotionEffect | null,
    arg5: Item | null
  ): void
  function SetBrushableItem(arg1: Location, arg2: Item | null): void
  function ParticleLineA(): void
  function SpawnEnderEye(
    arg1: Location,
    arg2: Location | null,
    arg3: Number | null,
    arg4: StyledText | null
  ): void
  function ShowSidebar(): void
  function SpawnPotionCloud(
    arg1: Location,
    arg2: PotionEffect | null,
    arg3: StyledText | null,
    arg4: Number | null,
    arg5: Number | null
  ): void
  function LaunchProj(
    arg1: Location,
    arg2: StyledText | null,
    arg3: Number | null,
    arg4: Number | null
  ): void
  function SpawnItemDisp(arg1: Location, arg2: Item): void
  function SetBlockGrowth(arg1: Location, arg2: Number | null): void
  function Wait(): void
  function SetContainerName(arg1: Location, arg2: StyledText): void
  function SetHead(arg1: Location, arg2: Item, arg3: String): void
  function RemoveHologram(): void
  function RemoveItems(arg1: Location, arg2: Item): void
  function SpawnRngItem(): void
  function SetRegion(arg1: Location, arg2: Location): void
  function ParticleCircleA(): void
  function SpawnTNT(
    arg1: Location,
    arg2: Number | null,
    arg3: Number | null,
    arg4: StyledText | null
  ): void
  function SpawnExpOrb(
    arg1: Location,
    arg2: Number | null,
    arg3: StyledText | null
  ): void
  function SetBiome(arg1: String, arg2: Location, arg3: Location): void
  function SetEventHeal(arg1: Number): void
  function ApplyTransaction(): void
  function ParticleRay(): void
  function GenerateTree(arg1: Location): void
  function StopLoop(): void
  function SetScObj(): void
  function SpawnCrystal(arg1: Location, arg2: StyledText | null): void
  function SetCampfireItem(
    arg1: Location,
    arg2: Item,
    arg3: Number | null
  ): void
  function SpawnTextDisplay(arg1: Location, arg2: StyledText): void
  function SpawnVehicle(arg1: Location, arg2: StyledText | null): void
  function Lightning(arg1: Location): void
  function ParticleSpiralA(): void
  function SetScore(): void
  function ParticleCluster(): void
  function BlockDropsOff(): void
  function ParticleLine(): void
}
declare namespace IfGame {
  function SignHasTxt(): void
  function HasRoomForItem(arg1: Location, arg2: Item | null): void
  function EventBlockEquals(): void
  function CommandEquals(arg1: String): void
  function EventItemEquals(arg1: Item): void
  function AttackIsCrit(): void
  function ContainerHas(arg1: Location, arg2: Item): void
  function BlockEquals(arg1: Location): void
  function InBlock(arg1: Location): void
  function BlockPowered(arg1: Location): void
  function HasPlayer(arg1: String): void
  function ContainerHasAll(arg1: Location, arg2: Item): void
  function CmdArgEquals(arg1: String, arg2: Number): void
  function EventCancelled(): void
  function IsChunkLoaded(arg1: Location): void
}
declare namespace IfEntity {
  function IsVehicle(): void
  function IsGrounded(): void
  function IsType(): void
  function IsProj(): void
  function IsMob(): void
  function HasCustomTag(
    arg1: String,
    arg2: Number | null,
    arg3: String | null
  ): void
  function IsSheared(): void
  function IsItem(): void
  function Exists(): void
  function IsNear(arg1: Location, arg2: Number | null): void
  function HasPotion(arg1: PotionEffect): void
  function IsRiding(): void
  function StandingOn(): void
  function NameEquals(arg1: String, arg2: StyledText): void
}
declare namespace IfPlayer {
  function IsLookingAt(arg1: Location, arg2: Number | null): void
  function InWorldBorder(arg1: Location | null): void
  function IsInGameMode(): void
  function HasRoomForItem(arg1: Item | null): void
  function IsHoldingOff(): void
  function UsingPack(): void
  function NoItemCooldown(arg1: Item): void
  function IsUsingItem(arg1: Item | null): void
  function HasAllItems(): void
  function IsSwimming(): void
  function HasItem(arg1: Item): void
  function BlockEquals(): void
  function IsWearing(arg1: Item): void
  function IsNear(arg1: Location, arg2: Number | null): void
  function IsRiding(): void
  function StandingOn(): void
  function CmdEquals(): void
  function IsGrounded(): void
  function CursorItem(arg1: Item | null): void
  function SlotEquals(arg1: Number): void
  function ItemEquals(): void
  function IsHoldingMain(): void
  function IsHolding(arg1: Item | null): void
  function MenuSlotEquals(arg1: Number, arg2: Item | null): void
  function IsBlocking(): void
  function HasPermission(): void
  function MainHandEquals(): void
  function IsSneaking(): void
  function IsFlying(): void
  function HasPotion(arg1: PotionEffect): void
  function NameEquals(arg1: String): void
  function InvOpen(): void
  function HasSlotItem(arg1: Number, arg2: Item | null): void
  function IsSprinting(): void
  function IsGliding(): void
  function CmdArgEquals(): void
}
