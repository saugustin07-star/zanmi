import ZippyAvatar from './ZippyAvatar';
import NovaAvatar from './NovaAvatar';
import MiloAvatar from './MiloAvatar';
import SunnyAvatar from './SunnyAvatar';
import JaxAvatar from './JaxAvatar';
import LunaAvatar from './LunaAvatar';

export type AvatarComponentType = React.ComponentType<{ size?: number }>;

export const AVATAR_COMPONENTS: Record<string, AvatarComponentType> = {
  zippy: ZippyAvatar,
  nova: NovaAvatar,
  milo: MiloAvatar,
  sunny: SunnyAvatar,
  jax: JaxAvatar,
  luna: LunaAvatar,
};

export { ZippyAvatar, NovaAvatar, MiloAvatar, SunnyAvatar, JaxAvatar, LunaAvatar };
