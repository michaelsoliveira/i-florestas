import { getRepository } from 'typeorm';
import { Permission } from '../entities/Permission';
import { Role } from '../entities/Role'
import { User } from '../entities/User'

type PermissionRequest = {
  name: string;
  description: string;
};

type RolePermissionRequest = {
  roleId: string;
  permissions: string[];
};

type RoleRequest = {
  name: string;
  description: string;
};

type UserACLRequest = {
  id: string;
  roles: string[];
  permissions: string[];
};

export class CreateUserACLService {
  async execute({ id, roles, permissions }: UserACLRequest): Promise<User | Error> {
    const repo = getRepository(User);

    const user = await repo.findOne(id);

    if (!user) {
      return new Error("User does not exists!");
    }

    const permissionsExists = await getRepository(Permission).findByIds(
      permissions
    );

    const rolesExists = await getRepository(Role).findByIds(roles);

    user.permissions = permissionsExists;
    user.roles = rolesExists;

    repo.save(user);

    return user;
  }
}

export class CreateRoleService {
  async execute({ name, description }: RoleRequest): Promise<Role | Error> {
    const repo = getRepository(Role);

    if (await repo.findOne({ name })) {
      return new Error("Role already exists");
    }

    const role = repo.create({ name, description });

    await repo.save(role);

    return role;
  }
}

export class CreatePermissionService {
  async execute({ name, description }: PermissionRequest): Promise<Permission | Error> {
    const repo = getRepository(Permission);

    if (await repo.findOne({ name })) {
      return new Error("Permission already exists");
    }

    const permission = repo.create({ name, description });

    await repo.save(permission);

    return permission;
  }
}

export class CreateRolePermissionService {
  async execute({ roleId, permissions }: RolePermissionRequest): Promise<Role | Error> {
    const repo = getRepository(Role);

    const role = await repo.findOne(roleId);

    if (!role) {
      return new Error("Role does not exists!");
    }

    const permissionsExists = await repo.findByIds(permissions);

    role.permissions = permissionsExists;

    await repo.save(role);

    return role;
  }
}

