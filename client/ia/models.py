from sqlalchemy import ARRAY, Boolean, CHAR, CheckConstraint, Column, DateTime, Enum, Float, ForeignKey, Index, Integer, LargeBinary, Numeric, SmallInteger, String, Table, Text, text
from sqlalchemy.dialects.postgresql import TIMESTAMP, UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql.sqltypes import NullType
from sqlalchemy.ext.declarative import declarative_base
from geoalchemy2 import Geometry
from .database import Base

metadata = Base.metadata

class PrismaMigration(Base):
    __tablename__ = '_prisma_migrations'
    __table_args__ = {'schema': 'public'}

    id = Column(String(36), primary_key=True)
    checksum = Column(String(64), nullable=False)
    finished_at = Column(DateTime(True))
    migration_name = Column(String(255), nullable=False)
    logs = Column(Text)
    rolled_back_at = Column(DateTime(True))
    started_at = Column(DateTime(True), nullable=False, server_default=text("now()"))
    applied_steps_count = Column(Integer, nullable=False, server_default=text("0"))


class Detentor(Base):
    __tablename__ = 'detentor'
    __table_args__ = {'schema': 'public'}

    id = Column(UUID, primary_key=True, server_default=text("uuid_generate_v4()"))
    id_pessoa = Column(ForeignKey('public.pessoa_fisica.id'), unique=True)

    pessoa_fisica = relationship('PessoaFisica')


class EquacaoModelo(Base):
    __tablename__ = 'equacao_modelo'
    __table_args__ = {'schema': 'public'}

    id = Column(UUID, primary_key=True, server_default=text("uuid_generate_v4()"))
    nome = Column(Text, nullable=False)
    expressao = Column(String(100), nullable=False)


class Estado(Base):
    __tablename__ = 'estado'
    __table_args__ = {'schema': 'public'}

    id = Column(UUID, primary_key=True, server_default=text("uuid_generate_v4()"))
    uf = Column(Text, nullable=False)
    nome = Column(Text, nullable=False)
    ddd = Column(SmallInteger)


t_geography_columns = Table(
    'geography_columns', metadata,
    Column('f_table_catalog', String),
    Column('f_table_schema', String),
    Column('f_table_name', String),
    Column('f_geography_column', String),
    Column('coord_dimension', Integer),
    Column('srid', Integer),
    Column('type', Text),
    schema='public'
)


t_geometry_columns = Table(
    'geometry_columns', metadata,
    Column('f_table_catalog', String(256)),
    Column('f_table_schema', String),
    Column('f_table_name', String),
    Column('f_geometry_column', String),
    Column('coord_dimension', Integer),
    Column('srid', Integer),
    Column('type', String(30)),
    schema='public'
)


class MotivoPreservacao(Base):
    __tablename__ = 'motivo_preservacao'
    __table_args__ = {'schema': 'public'}

    nome = Column(Text)
    id = Column(Integer, primary_key=True)


class Permission(Base):
    __tablename__ = 'permissions'
    __table_args__ = {'schema': 'public'}

    id = Column(UUID, primary_key=True, server_default=text("uuid_generate_v4()"))
    created_at = Column(TIMESTAMP(precision=6), nullable=False, server_default=text("now()"))
    updated_at = Column(TIMESTAMP(precision=6), nullable=False, server_default=text("now()"))
    name = Column(String, nullable=False)
    description = Column(String, nullable=False)

    roles = relationship('Role', secondary='public.permissions_roles')
    users = relationship('User', secondary='public.users_permissions')


class Pessoa(Base):
    __tablename__ = 'pessoa'
    __table_args__ = {'schema': 'public'}

    id = Column(UUID, primary_key=True, server_default=text("uuid_generate_v4()"))
    created_at = Column(TIMESTAMP(precision=6), nullable=False, server_default=text("now()"))
    updated_at = Column(TIMESTAMP(precision=6), nullable=False, server_default=text("now()"))
    tipo = Column(Enum('F', 'J', name='TipoPessoa'), nullable=False, server_default=text("'F'::\"TipoPessoa\""))
    id_projeto = Column(ForeignKey('public.projeto.id'), unique=True)
    id_endereco = Column(ForeignKey('public.endereco.id', ondelete='CASCADE', onupdate='CASCADE'))
    id_telefone = Column(ForeignKey('public.telefone.id', ondelete='CASCADE'))

    endereco = relationship('Endereco')
    projeto = relationship('Projeto')
    telefone = relationship('Telefone')


class PessoaFisica(Base):
    __tablename__ = 'pessoa_fisica'
    __table_args__ = {'schema': 'public'}

    id = Column(UUID, primary_key=True, server_default=text("uuid_generate_v4()"))
    created_at = Column(TIMESTAMP(precision=6), nullable=False, server_default=text("now()"))
    updated_at = Column(TIMESTAMP(precision=6), nullable=False, server_default=text("now()"))
    rg = Column(String(30))
    cpf = Column(String(14))
    data_nascimento = Column(TIMESTAMP(precision=3))
    id_pessoa = Column(ForeignKey('public.pessoa.id', ondelete='CASCADE', onupdate='CASCADE'), unique=True)
    nome = Column(Text)

    pessoa = relationship('Pessoa')


class Poa(Base):
    __tablename__ = 'poa'
    __table_args__ = {'schema': 'public'}

    id = Column(UUID, primary_key=True, server_default=text("uuid_generate_v4()"))
    descricao = Column(Text)
    data_ultimo_plan = Column(TIMESTAMP(precision=6))
    pmfs = Column(Text)
    id_situacao = Column(ForeignKey('public.situacao_poa.id'))
    corte_maximo = Column(Float(53))
    user_id = Column(ForeignKey('public.users.id', ondelete='RESTRICT', onupdate='CASCADE'), nullable=False)
    id_projeto = Column(ForeignKey('public.projeto.id', ondelete='RESTRICT', onupdate='CASCADE'), nullable=False)
    id_detentor = Column(ForeignKey('public.detentor.id'))
    id_proponente = Column(ForeignKey('public.proponente.id'))
    id_resp_elab = Column(ForeignKey('public.responsavel_tecnico.id', ondelete='CASCADE', onupdate='CASCADE'))
    id_resp_exec = Column(ForeignKey('public.responsavel_tecnico.id', ondelete='CASCADE', onupdate='CASCADE'))
    num_art_resp_elab = Column(Integer)
    num_art_resp_exec = Column(Integer)
    protocolo_poa = Column(Text)

    detentor = relationship('Detentor')
    projeto = relationship('Projeto', primaryjoin='Poa.id_projeto == Projeto.id')
    proponente = relationship('Proponente')
    responsavel_tecnico = relationship('ResponsavelTecnico', primaryjoin='Poa.id_resp_elab == ResponsavelTecnico.id')
    responsavel_tecnico1 = relationship('ResponsavelTecnico', primaryjoin='Poa.id_resp_exec == ResponsavelTecnico.id')
    situacao_poa = relationship('SituacaoPoa')
    user = relationship('User', primaryjoin='Poa.user_id == User.id')


class Projeto(Base):
    __tablename__ = 'projeto'
    __table_args__ = {'schema': 'public'}

    id = Column(UUID, primary_key=True, server_default=text("uuid_generate_v4()"))
    created_at = Column(TIMESTAMP(precision=6), nullable=False, server_default=text("now()"))
    updated_at = Column(TIMESTAMP(precision=6), nullable=False, server_default=text("now()"))
    nome = Column(String, nullable=False)
    data_exclusao = Column(TIMESTAMP(precision=3))
    dmin_relatorio = Column(Integer)
    excluido = Column(Boolean, nullable=False, server_default=text("false"))
    intervalo_dmin_relatorio = Column(Integer)
    reg_ambiental = Column(String(50))
    id_poa_ativo = Column(ForeignKey('public.poa.id'))

    poa = relationship('Poa', primaryjoin='Projeto.id_poa_ativo == Poa.id')


class Proponente(Base):
    __tablename__ = 'proponente'
    __table_args__ = {'schema': 'public'}

    id = Column(UUID, primary_key=True, server_default=text("uuid_generate_v4()"))
    id_pessoa = Column(ForeignKey('public.pessoa_fisica.id'), unique=True)

    pessoa_fisica = relationship('PessoaFisica')


t_raster_columns = Table(
    'raster_columns', metadata,
    Column('r_table_catalog', String),
    Column('r_table_schema', String),
    Column('r_table_name', String),
    Column('r_raster_column', String),
    Column('srid', Integer),
    Column('scale_x', Float(53)),
    Column('scale_y', Float(53)),
    Column('blocksize_x', Integer),
    Column('blocksize_y', Integer),
    Column('same_alignment', Boolean),
    Column('regular_blocking', Boolean),
    Column('num_bands', Integer),
    Column('pixel_types', ARRAY(Text())),
    Column('nodata_values', ARRAY(Float(precision=53))),
    Column('out_db', ARRAY(Boolean())),
    Column('extent', Geometry),
    Column('spatial_index', Boolean),
    schema='public'
)


t_raster_overviews = Table(
    'raster_overviews', metadata,
    Column('o_table_catalog', String),
    Column('o_table_schema', String),
    Column('o_table_name', String),
    Column('o_raster_column', String),
    Column('r_table_catalog', String),
    Column('r_table_schema', String),
    Column('r_table_name', String),
    Column('r_raster_column', String),
    Column('overview_factor', Integer),
    schema='public'
)


class ResponsavelTecnico(Base):
    __tablename__ = 'responsavel_tecnico'
    __table_args__ = {'schema': 'public'}

    id = Column(UUID, primary_key=True, server_default=text("uuid_generate_v4()"))
    crea = Column(String(50))
    id_projeto = Column(ForeignKey('public.projeto.id'))
    id_pessoa = Column(ForeignKey('public.pessoa.id'))

    pessoa = relationship('Pessoa')
    projeto = relationship('Projeto')


class Role(Base):
    __tablename__ = 'roles'
    __table_args__ = {'schema': 'public'}

    id = Column(UUID, primary_key=True, server_default=text("uuid_generate_v4()"))
    created_at = Column(TIMESTAMP(precision=6), nullable=False, server_default=text("now()"))
    updated_at = Column(TIMESTAMP(precision=6), nullable=False, server_default=text("now()"))
    name = Column(String, nullable=False)
    description = Column(String, nullable=False)


class SituacaoArvore(Base):
    __tablename__ = 'situacao_arvore'
    __table_args__ = {'schema': 'public'}

    nome = Column(Text)
    id = Column(Integer, primary_key=True)


class SituacaoPoa(Base):
    __tablename__ = 'situacao_poa'
    __table_args__ = {'schema': 'public'}

    id = Column(UUID, primary_key=True, server_default=text("uuid_generate_v4()"))
    nome = Column(Text)


class SpatialRefSy(Base):
    __tablename__ = 'spatial_ref_sys'
    __table_args__ = (
        CheckConstraint('(srid > 0) AND (srid <= 998999)'),
        {'schema': 'public'}
    )

    srid = Column(Integer, primary_key=True)
    auth_name = Column(String(256))
    auth_srid = Column(Integer)
    srtext = Column(String(2048))
    proj4text = Column(String(2048))


class Telefone(Base):
    __tablename__ = 'telefone'
    __table_args__ = {'schema': 'public'}

    id = Column(UUID, primary_key=True, server_default=text("uuid_generate_v4()"))
    created_at = Column(TIMESTAMP(precision=6), nullable=False, server_default=text("now()"))
    updated_at = Column(TIMESTAMP(precision=6), nullable=False, server_default=text("now()"))
    ddd = Column(Text)
    numero = Column(String(10))


class User(Base):
    __tablename__ = 'users'
    __table_args__ = {'schema': 'public'}

    id = Column(UUID, primary_key=True, server_default=text("uuid_generate_v4()"))
    created_at = Column(TIMESTAMP(precision=6), nullable=False, server_default=text("now()"))
    updated_at = Column(TIMESTAMP(precision=6), nullable=False, server_default=text("now()"))
    username = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)
    provider = Column(String)
    id_provider = Column(String)
    image = Column(String)
    email_verified = Column(TIMESTAMP(precision=3))
    id_poa_ativo = Column(ForeignKey('public.poa.id', onupdate='CASCADE'))
    id_projeto_ativo = Column(ForeignKey('public.projeto.id', onupdate='CASCADE'), nullable=False)

    poa = relationship('Poa', primaryjoin='User.id_poa_ativo == Poa.id')
    projeto = relationship('Projeto')


t_verification_tokens = Table(
    'verification_tokens', metadata,
    Column('identifier', Text, nullable=False),
    Column('token', Text, nullable=False, unique=True),
    Column('expires', TIMESTAMP(precision=3), nullable=False),
    Index('verification_tokens_identifier_token_key', 'identifier', 'token', unique=True),
    schema='public'
)


class Account(Base):
    __tablename__ = 'accounts'
    __table_args__ = (
        Index('accounts_provider_providerAccountId_key', 'provider', 'providerAccountId', unique=True),
        {'schema': 'public'}
    )

    id = Column(UUID, primary_key=True, server_default=text("uuid_generate_v4()"))
    userId = Column(ForeignKey('public.users.id', ondelete='CASCADE', onupdate='CASCADE'), nullable=False)
    type = Column(Text, nullable=False)
    provider = Column(Text, nullable=False)
    providerAccountId = Column(Text, nullable=False)
    refresh_token = Column(Text)
    access_token = Column(Text)
    expires_at = Column(Integer)
    token_type = Column(Text)
    scope = Column(Text)
    id_token = Column(Text)
    session_state = Column(Text)

    user = relationship('User')


class CategoriaEspecie(Base):
    __tablename__ = 'categoria_especie'
    __table_args__ = {'schema': 'public'}

    id = Column(UUID, primary_key=True, server_default=text("uuid_generate_v4()"))
    created_at = Column(TIMESTAMP(precision=6), nullable=False, server_default=text("now()"))
    updated_at = Column(TIMESTAMP(precision=6), nullable=False, server_default=text("now()"))
    nome = Column(String(50))
    criterio_fuste = Column(SmallInteger)
    criterio_dminc = Column(SmallInteger)
    criterio_dmaxc = Column(SmallInteger)
    criterio_n_min = Column(SmallInteger)
    criterio_perc_min = Column(SmallInteger)
    preservar = Column(Boolean)
    criterio_altura = Column(Float(53))
    criterio_volume = Column(Float(53))
    id_projeto = Column(ForeignKey('public.projeto.id'))
    id_poa = Column(ForeignKey('public.poa.id'))

    poa = relationship('Poa')
    projeto = relationship('Projeto')
    especie = relationship('Especie', secondary='public.categoria_especie_poa')


class Endereco(Base):
    __tablename__ = 'endereco'
    __table_args__ = {'schema': 'public'}

    id = Column(UUID, primary_key=True, server_default=text("uuid_generate_v4()"))
    created_at = Column(TIMESTAMP(precision=6), nullable=False, server_default=text("now()"))
    updated_at = Column(TIMESTAMP(precision=6), nullable=False, server_default=text("now()"))
    cep = Column(String(8))
    logradouro = Column(String(60))
    municipio = Column(String(30))
    bairro = Column(String(50))
    id_estado = Column(ForeignKey('public.estado.id'))

    estado = relationship('Estado')


class EquacaoVolume(Base):
    __tablename__ = 'equacao_volume'
    __table_args__ = {'schema': 'public'}

    id = Column(UUID, primary_key=True, server_default=text("uuid_generate_v4()"))
    nome = Column(Text, nullable=False)
    expressao = Column(String(250), nullable=False)
    observacao = Column(Text)
    id_projeto = Column(ForeignKey('public.projeto.id'))

    projeto = relationship('Projeto')


class Especie(Base):
    __tablename__ = 'especie'
    __table_args__ = {'schema': 'public'}

    id = Column(UUID, primary_key=True, server_default=text("uuid_generate_v4()"))
    created_at = Column(TIMESTAMP(precision=6), nullable=False, server_default=text("now()"))
    updated_at = Column(TIMESTAMP(precision=6), nullable=False, server_default=text("now()"))
    nome = Column(String(100))
    nome_orgao = Column(String(100))
    nome_cientifico = Column(String(200))
    id_projeto = Column(ForeignKey('public.projeto.id'))

    projeto = relationship('Projeto')


class ObservacaoArvore(Base):
    __tablename__ = 'observacao_arvore'
    __table_args__ = {'schema': 'public'}

    id = Column(UUID, primary_key=True, server_default=text("uuid_generate_v4()"))
    nome = Column(Text)
    preservar = Column(Boolean, nullable=False, server_default=text("true"))
    id_projeto = Column(ForeignKey('public.projeto.id'))

    projeto = relationship('Projeto')


t_permissions_roles = Table(
    'permissions_roles', metadata,
    Column('role_id', ForeignKey('public.roles.id', ondelete='CASCADE', onupdate='CASCADE'), primary_key=True, nullable=False, index=True),
    Column('permission_id', ForeignKey('public.permissions.id', ondelete='CASCADE', onupdate='CASCADE'), primary_key=True, nullable=False, index=True),
    schema='public'
)


class PessoaJuridica(Base):
    __tablename__ = 'pessoa_juridica'
    __table_args__ = {'schema': 'public'}

    id = Column(UUID, primary_key=True, server_default=text("uuid_generate_v4()"))
    created_at = Column(TIMESTAMP(precision=6), nullable=False, server_default=text("now()"))
    updated_at = Column(TIMESTAMP(precision=6), nullable=False, server_default=text("now()"))
    razao_social = Column(String(100), nullable=False)
    inscricao_estadual = Column(String(30))
    inscricao_federal = Column(String(30))
    cnpj = Column(String(14))
    data_constituicao = Column(TIMESTAMP(precision=3))
    id_pessoa = Column(ForeignKey('public.pessoa.id'), unique=True)
    nome_fantasia = Column(String(100), nullable=False)

    pessoa = relationship('Pessoa')


class RefreshToken(Base):
    __tablename__ = 'refresh_token'
    __table_args__ = {'schema': 'public'}

    id = Column(UUID, primary_key=True, server_default=text("uuid_generate_v4()"))
    created_at = Column(TIMESTAMP(precision=6), nullable=False, server_default=text("now()"))
    updated_at = Column(TIMESTAMP(precision=6), nullable=False, server_default=text("now()"))
    expires_in = Column(Integer, nullable=False)
    token = Column(String, nullable=False)
    id_user = Column(ForeignKey('public.users.id'))

    user = relationship('User')


class Session(Base):
    __tablename__ = 'sessions'
    __table_args__ = {'schema': 'public'}

    id = Column(UUID, primary_key=True, server_default=text("uuid_generate_v4()"))
    sessionToken = Column(Text, nullable=False, unique=True)
    userId = Column(ForeignKey('public.users.id', ondelete='CASCADE', onupdate='CASCADE'), nullable=False)
    expires = Column(TIMESTAMP(precision=3), nullable=False)

    user = relationship('User')


class Umf(Base):
    __tablename__ = 'umf'
    __table_args__ = {'schema': 'public'}

    id = Column(UUID, primary_key=True, server_default=text("uuid_generate_v4()"))
    created_at = Column(TIMESTAMP(precision=6), nullable=False, server_default=text("now()"))
    updated_at = Column(TIMESTAMP(precision=6), nullable=False, server_default=text("now()"))
    nome = Column(String(50), nullable=False)
    municipio = Column(Text)
    localizacao = Column(String(50))
    id_estado = Column(ForeignKey('public.estado.id'))
    id_projeto = Column(ForeignKey('public.projeto.id'))

    estado = relationship('Estado')
    projeto = relationship('Projeto')


t_users_permissions = Table(
    'users_permissions', metadata,
    Column('user_id', ForeignKey('public.users.id', ondelete='CASCADE', onupdate='CASCADE'), primary_key=True, nullable=False, index=True),
    Column('permission_id', ForeignKey('public.permissions.id', ondelete='CASCADE', onupdate='CASCADE'), primary_key=True, nullable=False, index=True),
    schema='public'
)


class UsersRole(Base):
    __tablename__ = 'users_roles'
    __table_args__ = {'schema': 'public'}

    user_id = Column(ForeignKey('public.users.id', ondelete='CASCADE', onupdate='CASCADE'), primary_key=True, nullable=False, index=True)
    role_id = Column(ForeignKey('public.roles.id', ondelete='CASCADE', onupdate='CASCADE'), primary_key=True, nullable=False, index=True)
    id_projeto = Column(ForeignKey('public.projeto.id', ondelete='CASCADE', onupdate='CASCADE'), primary_key=True, nullable=False, index=True)

    projeto = relationship('Projeto')
    role = relationship('Role')
    user = relationship('User')


t_categoria_especie_poa = Table(
    'categoria_especie_poa', metadata,
    Column('id_categoria', ForeignKey('public.categoria_especie.id', onupdate='CASCADE'), primary_key=True, nullable=False, index=True),
    Column('id_especie', ForeignKey('public.especie.id', ondelete='CASCADE', onupdate='CASCADE'), primary_key=True, nullable=False, index=True),
    schema='public'
)


class Upa(Base):
    __tablename__ = 'upa'
    __table_args__ = {'schema': 'public'}

    id = Column(UUID, primary_key=True, server_default=text("uuid_generate_v4()"))
    created_at = Column(TIMESTAMP(precision=6), nullable=False, server_default=text("now()"))
    updated_at = Column(TIMESTAMP(precision=6), nullable=False, server_default=text("now()"))
    ano = Column(Integer, nullable=False)
    descricao = Column(String(50))
    tipo = Column(Integer)
    id_umf = Column(ForeignKey('public.umf.id', ondelete='CASCADE', onupdate='CASCADE'))
    srid = Column(ForeignKey('public.spatial_ref_sys.srid', onupdate='CASCADE'))
    id_equacao_volume = Column(ForeignKey('public.equacao_volume.id', onupdate='CASCADE'))

    equacao_volume = relationship('EquacaoVolume')
    umf = relationship('Umf')
    spatial_ref_sy = relationship('SpatialRefSy')


class Ut(Base):
    __tablename__ = 'ut'
    __table_args__ = {'schema': 'public'}

    id = Column(UUID, primary_key=True, server_default=text("uuid_generate_v4()"))
    created_at = Column(TIMESTAMP(precision=6), nullable=False, server_default=text("now()"))
    updated_at = Column(TIMESTAMP(precision=6), nullable=False, server_default=text("now()"))
    numero_ut = Column(Integer, nullable=False)
    area_util = Column(Float(53))
    quantidade_faixas = Column(Integer)
    largura_faixas = Column(Integer)
    comprimento_faixas = Column(Integer)
    area_total = Column(Float(53))
    azimute = Column(Float(53))
    quadrante = Column(Integer)
    latitude = Column(Float(53))
    longitude = Column(Float(53))
    shapefile = Column(LargeBinary)
    origem = Column(Geometry("POINT"))
    id_upa = Column(ForeignKey('public.upa.id', onupdate='CASCADE'))
    id_poa = Column(ForeignKey('public.poa.id', onupdate='CASCADE'))
    polygon_path = Column(Geometry('MULTIPOLYGON'))

    poa = relationship('Poa')
    upa = relationship('Upa')


class Arvore(Base):
    __tablename__ = 'arvore'
    __table_args__ = (
        Index('arvore_numero_arvore_id_ut_key', 'numero_arvore', 'id_ut', unique=True),
        {'schema': 'public'}
    )

    id = Column(UUID, primary_key=True, server_default=text("uuid_generate_v4()"))
    created_at = Column(TIMESTAMP(precision=6), nullable=False, server_default=text("now()"))
    updated_at = Column(TIMESTAMP(precision=6), nullable=False, server_default=text("now()"))
    numero_arvore = Column(Integer, nullable=False)
    dap = Column(Numeric(5, 2))
    altura = Column(Numeric(5, 2))
    fuste = Column(Integer)
    area_basal = Column(Float(53))
    volume = Column(Numeric(5, 2))
    comentario = Column(Text)
    orient_x = Column(CHAR(1))
    faixa = Column(Integer)
    derrubada = Column(Boolean, nullable=False, server_default=text("false"))
    secoes = Column(Integer)
    ponto_arvore = Column(Geometry)
    ponto_gps = Column(Integer)
    lat = Column(Float(53))
    lng = Column(Float(53))
    id_ut = Column(ForeignKey('public.ut.id'))
    id_especie = Column(ForeignKey('public.especie.id'))
    id_observacao = Column(ForeignKey('public.observacao_arvore.id'))
    motivo_nao_derrubada = Column(String(120))
    substituida = Column(Boolean, nullable=False, server_default=text("false"))
    id_substituta = Column(ForeignKey('public.arvore.id', ondelete='SET NULL', onupdate='CASCADE'))
    id_situacao = Column(ForeignKey('public.situacao_arvore.id'))
    id_motivo_preservacao = Column(ForeignKey('public.motivo_preservacao.id'))
    lat_y = Column(Float(53))
    long_x = Column(Float(53))

    especie = relationship('Especie')
    motivo_preservacao = relationship('MotivoPreservacao')
    observacao_arvore = relationship('ObservacaoArvore')
    situacao_arvore = relationship('SituacaoArvore')
    parent = relationship('Arvore', remote_side=[id])
    ut = relationship('Ut')